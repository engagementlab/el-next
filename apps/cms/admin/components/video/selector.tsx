/**
 * Engagement Lab 'Next' CMS
 * Developed by Engagement Lab, 2022-2023
 *
 * @author Johnny Richardson
 * Custom video field selection grid
 * ==========
 */

import React, { useState } from 'react';
import Script from 'next/script';
import _ from 'lodash';
import { create } from 'zustand';

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
/**
 *
 * @function
 * @returns {function}
 */
export interface RelatedVideo {
  label: string;
  value: string;
  thumb: string;
  thumbSm: string;
  caption?: string;
}
export interface RelatedVideoField {
  [key: string]: {
    label: string;
    value: string;
    thumb: string;
    thumbSm: string;
    caption?: string;
  };
}

type VideoSelectorProps = {
  video?: RelatedVideoField | null | undefined;
  videos?: RelatedVideo[];
  open: boolean;
  singleSelection?: boolean;
  data: any[];
  selectionChanged: any;
  done: any;
};

type VideoGridState = {
  pgIndex: number;
  currentVideos: RelatedVideo[];
  currentVideo: RelatedVideoField | null | undefined;
  waiting: boolean;

  toggleWaiting: () => void;
  setData: (vidData: any[]) => void;
  setPageIndex: (pgIndex: number) => void;
  setVideo: (value: RelatedVideo) => void;
  setVideoSingle: (value: RelatedVideoField) => void;
  setGridOpen: (open: boolean) => void;
};

const TailwindCdnScript = () => {
  return (
    <>
      <Script src="https://cdn.tailwindcss.com/3.3.0" />
      <Script>
        {`
              if(tailwind) {
                tailwind.config = {
                  corePlugins: {
                    preflight: false,
                  },        
                }
              }`}
      </Script>
    </>
  );
};

const VideoSelector = ({
  videos,
  video,
  data,
  open,
  singleSelection,
  selectionChanged,
  done,
}: VideoSelectorProps) => {
  // Create store with Zustand
  const [useStore] = useState(() =>
    create<VideoGridState>((set) => ({
      gridOpen: false,
      pgIndex: 0,
      data: [],
      waiting: true,

      currentVideo: video || null,
      currentVideos: videos || [],
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
      setVideoSingle: (video: RelatedVideoField) =>
        set((state) => {
          return {
            ...state,
            currentVideo: video,
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
  const {
    setVideo,
    setVideoSingle,
    setPageIndex,
    setGridOpen,
    pgIndex,
    currentVideos,
    currentVideo,
  } = useStore((state) => state);

  const beginIndex = pgIndex * 12;
  const endIndex = beginIndex + 12;
  const dataLength = Math.floor(data.length / 12) + 1;
  return (
    <>
      <TailwindCdnScript />
      <Modal
        open={open}
        onClose={() => {
          setGridOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {data.length > 0 ? (
          <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 border-2 bg-white p-4 shadow-xl">
            <>
              <div className="flex flex-row">
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

              <hr className=" border-t-2 border-[#f6a536] my-3" />

              <Box className="flex-grow-1">
                <Grid container spacing={2}>
                  {data
                    .slice(beginIndex, endIndex)
                    .map((item: RelatedVideo) => {
                      const selected = singleSelection
                        ? (currentVideo as any).value ===
                          (item as RelatedVideo).value
                        : _.map(currentVideos, 'value').includes(
                            (item as RelatedVideo).value
                          );
                      // console.log(selected, currentVideo);
                      return (
                        <Grid item xs={3} key={item.value}>
                          <a
                            className="relative cursor-pointer"
                            onClick={() => {
                              if (singleSelection) setVideoSingle(item as any);
                              else setVideo(item);
                              // Are we allowing only one video to be selected?
                              selectionChanged(item as RelatedVideo);
                            }}
                          >
                            {selected && (
                              <div className="absolute top-0 left-0">
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
                  done();
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
    </>
  );
};
export default VideoSelector;
