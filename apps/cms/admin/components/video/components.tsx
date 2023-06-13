/** @jsxImportSource @emotion/react */
/* eslint-disable @next/next/no-img-element */
import { FieldProps } from '@keystone-6/core/types';
import { Button } from '@keystone-ui/button';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import { controller } from '@keystone-6/core/fields/types/json/views';
import { Fragment, useState } from 'react';

import { css as emCss } from '@emotion/css';
import { create } from 'zustand';

import axios from 'axios';
import _ from 'lodash';

import VideoSelector, { RelatedVideo } from './selector';

type VideoGridState = {
  currentVideos: RelatedVideo[];
  gridOpen: boolean;
  data: any[];

  setData: (vidData: any[]) => void;
  setVideo: (value: RelatedVideo) => void;
  setVideoCaption: (videoIndex: number, caption: string) => void;
  setGridOpen: (open: boolean) => void;
};

const styles = {
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
      data: [],
      currentVideos: value ? JSON.parse(value) : [],
      setData: (vidData: any[]) =>
        set((state) => {
          return {
            ...state,
            data: vidData,
          };
        }),
      setVideo: (video: RelatedVideo) =>
        set((state) => {
          console.log(
            video.label,
            _.map(state.currentVideos, 'value').includes(video.value)
          );
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

  const setVideoCaption = useStore((state) => state.setVideoCaption);
  const setVideo = useStore((state: { setVideo: any }) => state.setVideo);
  const setGridOpen = useStore(
    (state: { setGridOpen: any }) => state.setGridOpen
  );
  const setData = useStore((state: { setData: any }) => state.setData);

  const data = useStore((state: { data: any }) => state.data);
  const gridOpen = useStore((state: { gridOpen: boolean }) => state.gridOpen);
  const currentVideos: RelatedVideo[] = useStore(
    (state: { currentVideos: any }) => state.currentVideos
  );

  const endpointPrefix =
    window.location.protocol === 'https:' ? '/api' : 'http://localhost:8000';

  return (
    <FieldContainer>
      {/* <FieldLabel>{field.label}</FieldLabel> */}
      <Fragment>
        {/* <Button
          size="small"
          disabled={onChange === undefined}
          tone="positive"
          onClick={() => {
            setGridOpen(true);
            // Get Vimeo data
            axios
              .get(`${endpointPrefix}/media/videos`)
              .then((response: { data: any[] }) => {
                setData(response.data);
              });
          }}
        >
          Select Videos
        </Button>

        <VideoSelector
          videos={currentVideos}
          data={data}
          open={gridOpen}
          selectionChanged={(item: RelatedVideo) => {
            setVideo(item);
            // setTimeout(() => {
            if (onChange) onChange(JSON.stringify(currentVideos));
            console.log(currentVideos);
            // }, 1000);
          }}
          done={() => setGridOpen(false)}
        /> */}
      </Fragment>

      <ul className={styles.list.ul}>
        {/* {currentVideos.map((relatedVideo: RelatedVideo, i: number) => {
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
        })} */}
      </ul>
    </FieldContainer>
  );
};
