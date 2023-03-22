/** @jsxImportSource @emotion/react */
/* eslint-disable @next/next/no-img-element */
import { FieldProps } from '@keystone-6/core/types';
import { Button } from '@keystone-ui/button';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import { controller } from '@keystone-6/core/fields/types/json/views';
import { Fragment, useState } from 'react';

import { css as emCss } from '@emotion/css';
import {
  Box,
  LinearProgress,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select as MUISelect,
} from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import create from 'zustand';
import axios from 'axios';
import _ from 'lodash';

interface RelatedVideo {
  label: string;
  value: string;
  thumb: string;
  thumbSm: string;
  caption: string;
}

type VideoGridState = {
  pgIndex: number;
  videoEditIndex: number;
  currentVideos: RelatedVideo[];
  gridOpen: boolean;
  waiting: boolean;
  data: any[];

  toggleWaiting: () => void;
  setData: (vidData: any[]) => void;
  setPageIndex: (pgIndex: number) => void;
  setVideo: (value: RelatedVideo) => void;
  setVideoCaptionEditing: (videoIndex: number) => void;
  setVideoCaption: (videoIndex: number, caption: string) => void;
  setGridOpen: (open: boolean) => void;
};

const styles = {
  form: {
    field: emCss`
      align-items: center;
      width: 100%;
      margin: 1rem 0 0 0;
    `,
    label: emCss`
      width: 10%;
    `,
    input: emCss`
      width: 90%;
    `,
    button: emCss`
      margin: .4rem;
    `,
    select: emCss`
      position: relative;
      z-index: 100;
      min-width: 100%;
    `,
    option: emCss`
      display: flex!important;
      flex-direction: row;
      padding: 1rem;
      cursor: pointer;
      p {
        width: 50%;
      }`,
  },
  list: {
    ul: emCss`
      list-style: none;
      margin: 1rem 0 0 0;
      padding: 0;
    `,
    li: emCss`
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      width: 100%;

      &:nth-of-type(2n) > div:nth-of-type(1) {
        background-color: white;
      }`,
    data: emCss`
      background-color: #eff3f6;
      padding: 0.5rem;
      flex: auto;
      display: flex;
      align-items: flex-start;
      flex-wrap: nowrap;
    `,
    dataLabel: emCss`
      width: 50%;
    `,
    input: emCss`
      padding: 0.5rem;
      border: 1px grey solid;
    `,
  },
  imagesModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
};
export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => {
  // Create store with Zustand
  const [useStore] = useState(() =>
    create<VideoGridState>((set) => ({
      gridOpen: false,
      pgIndex: 0,
      videoEditIndex: -1,
      data: [],
      waiting: true,
      videoUrl: value,
      currentVideos: value ? JSON.parse(value) : [],
      toggleWaiting: () =>
        set((state) => {
          return { waiting: !state.waiting };
        }),
      setPageIndex: (index: number) =>
        set((state) => {
          return {
            ...state,
            pgIndex: index,
          };
        }),
      setData: (vidData: any[]) =>
        set((state) => {
          return {
            ...state,
            data: vidData,
          };
        }),
      setVideo: (video: RelatedVideo) =>
        set((state) => {
          return _.map(state.currentVideos, 'value').includes(video.value)
            ? {
                ...state,
                currentVideos: state.currentVideos.filter(
                  (e) => e.value !== video.value
                ),
              }
            : {
                ...state,
                currentVideos: [...state.currentVideos, video],
              };
        }),
      setVideoCaptionEditing: (videoIndex: number) =>
        set((state) => {
          return {
            ...state,
            videoEditIndex: videoIndex,
          };
        }),
      setVideoCaption: (videoIndex: number, caption: string) =>
        set((state) => {
          const updatedVideos = [...state.currentVideos];
          updatedVideos[videoIndex].caption = caption;
          return {
            ...state,
            currentVideos: updatedVideos,
          };
        }),
      setGridOpen: (open: boolean) =>
        set((state) => {
          return {
            ...state,
            gridOpen: open,
          };
        }),
    }))
  );

  const setPageIndex = useStore(
    (state: { setPageIndex: any }) => state.setPageIndex
  );
  const setVideo = useStore((state: { setVideo: any }) => state.setVideo);
  const setVideoCaption = useStore((state) => state.setVideoCaption);
  const setGridOpen = useStore(
    (state: { setGridOpen: any }) => state.setGridOpen
  );
  const toggleWaiting = useStore(
    (state: { toggleWaiting: any }) => state.toggleWaiting
  );
  const setData = useStore((state: { setData: any }) => state.setData);

  const data = useStore((state: { data: any }) => state.data);
  const waiting = useStore((state: { waiting: any }) => state.waiting);
  const gridOpen = useStore((state: { gridOpen: boolean }) => state.gridOpen);
  const pgIndex = useStore((state: { pgIndex: any }) => state.pgIndex);
  const currentVideos: any = useStore(
    (state: { currentVideos: any }) => state.currentVideos
  );

  const beginIndex = pgIndex * 12;
  const endIndex = beginIndex + 12;
  const dataLength = Math.floor(data.length / 12) + 1;

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <Fragment>
        <Button
          size="small"
          disabled={onChange === undefined}
          onClick={() => {
            setGridOpen(true);
            // Get Vimeo data
            axios.get('/api/media/videos').then((response: { data: any[] }) => {
              setData(response.data);
              toggleWaiting();
            });
          }}
          tone="positive"
        >
          Select Videos
        </Button>
        <Modal
          open={gridOpen}
          onClose={() => {
            setGridOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {!waiting ? (
            <Box sx={styles.imagesModal}>
              <>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <IconButton
                    aria-label="go to last page"
                    disabled={pgIndex === 0}
                    onClick={(val) => {
                      setPageIndex(pgIndex - 1);
                    }}
                  >
                    <ArrowCircleLeftOutlinedIcon fontSize="large" />
                  </IconButton>
                  <MUISelect
                    value={pgIndex}
                    label="Page"
                    onChange={(val) => {
                      setPageIndex(!val ? 0 : (val.target.value as number));
                    }}
                  >
                    {[...new Array(dataLength)].map((v, i) => (
                      <MenuItem value={i} key={`pg-${i}`}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </MUISelect>
                  <IconButton
                    aria-label="go to right page"
                    disabled={pgIndex === dataLength - 1}
                    onClick={(val) => {
                      setPageIndex(pgIndex + 1);
                    }}
                  >
                    <ArrowCircleRightOutlinedIcon fontSize="large" />
                  </IconButton>
                </div>

                <hr style={{ borderTopWidth: '2px', borderColor: '#f6a536' }} />

                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    {data
                      .slice(beginIndex, endIndex)
                      .map((item: RelatedVideo) => {
                        const selected = _.map(currentVideos, 'value').includes(
                          (item as RelatedVideo).value
                        );
                        return (
                          <Grid item xs={3} key={item.value}>
                            <a
                              style={{
                                position: 'relative',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                setVideo(item as RelatedVideo);
                                if (onChange)
                                  onChange(JSON.stringify(currentVideos));
                              }}
                            >
                              {selected && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                  }}
                                >
                                  <CheckCircleOutlineIcon
                                    fontSize="large"
                                    htmlColor="#f6a536"
                                  />
                                </div>
                              )}
                              <img
                                src={item.thumbSm}
                                style={{ opacity: selected ? 0.5 : 1 }}
                              />
                              <p>{item.label}</p>
                            </a>
                          </Grid>
                        );
                      })}
                  </Grid>
                </Box>
                <br />
                <IconButton
                  aria-label="done"
                  onClick={() => {
                    setGridOpen(false);
                  }}
                >
                  <CheckTwoToneIcon fontSize="large" color="success" />
                </IconButton>
              </>
            </Box>
          ) : (
            <Box>
              <LinearProgress />
            </Box>
          )}
        </Modal>
      </Fragment>

      <ul className={styles.list.ul}>
        {currentVideos.map((relatedVideo: RelatedVideo, i: number) => {
          return (
            <li key={`related-video-${i}`} className={styles.list.li}>
              <div className={styles.list.data}>
                <div className={styles.list.dataLabel}>
                  {relatedVideo.label}
                </div>
                {onChange && (
                  <input
                    type="text"
                    className={styles.list.input}
                    placeholder={!relatedVideo.caption ? 'Add caption?' : ''}
                    defaultValue={relatedVideo.caption}
                    onKeyUp={(e) => {
                      setVideoCaption(i, e.currentTarget.value);
                      if (onChange) onChange(JSON.stringify(currentVideos));
                    }}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </FieldContainer>
  );
};
