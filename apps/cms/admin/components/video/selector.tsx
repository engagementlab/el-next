
/**
 * Engagement Lab 'Next' CMS
 * Developed by Engagement Lab, 2022-2023
 *
 * @author Johnny Richardson
 * Custom video field selection grid
 * ==========
 */

import React, { useState } from "react";
import _ from "lodash";
import create from "zustand";
import {
  css as emCss
} from '@emotion/css';

import { Box, LinearProgress, Grid, IconButton, MenuItem, Modal, Select as MUISelect } from '@mui/material';

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
  }
}

type VideoSelectorProps = {
    video?: RelatedVideoField | null | undefined;
    videos?: RelatedVideo[];
    open: boolean;
    singleSelection?: boolean;
    data: any[];
    selectionChanged: any;
    done: any;
}

type VideoGridState = {
  pgIndex: number;
  currentVideos: RelatedVideo[];
  currentVideo: RelatedVideoField | null | undefined;
  waiting: boolean;

  toggleWaiting: () => void
  setData: (vidData: any[]) => void
  setPageIndex: (pgIndex: number) => void
  setVideo: (value: RelatedVideo) => void
  setVideoSingle: (value: RelatedVideoField) => void
  setGridOpen: (open: boolean) => void
}


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
      }`
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
      p: 4
  },
};

const VideoSelector =  ({videos, video, data, open, singleSelection, selectionChanged, done}: VideoSelectorProps) => {

  // Create store with Zustand
  const [useStore] = useState(() => 
      create<VideoGridState>(set => ({
        gridOpen: false,
        pgIndex: 0,
        data: [],
        waiting: true,

        currentVideo: video || null,
        currentVideos: videos || [],
        toggleWaiting: () => set((state) => { 
            return { waiting: !state.waiting }; 
        }),
        setPageIndex: (index: number) => set((state) => {
            return {
                ...state,
                pgIndex: index,
            }
        }),
        setData: (vidData: any[]) => set((state) => {
            return {
                ...state,
                data: vidData,
            }
        }),
        setVideo: (video: RelatedVideo) => set((state) => {
            return _.map(state.currentVideos, 'value').includes(video.value) ? {
                    ...state,
                    currentVideos: state.currentVideos.filter(e => e.value !== video.value)
                } :
                {
                    ...state,
                    currentVideos: [...state.currentVideos, video]
                }
        }),
        setVideoSingle: (video: RelatedVideoField) => set((state) => {
          return {
                    ...state,
                    currentVideo: video
                }
        }),
        setGridOpen: (open: boolean) => set((state) => {
            return {
                ...state,
                gridOpen: open
            }
        }),
      })
  ));
const{
setVideo,  
setVideoSingle,  
setPageIndex, 
setGridOpen,  
pgIndex,  
currentVideos,
currentVideo} 
= useStore((state => state))

  const beginIndex = pgIndex * 12;
  const endIndex = beginIndex + 12;
  const dataLength = Math.floor(data.length / 12)+1;   
    return (
           <Modal
              open={open}
              onClose={() => {setGridOpen(false); }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >
                {data.length > 0 ?  
                  <Box sx={styles.imagesModal}>
                      <>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                          <IconButton aria-label="go to last page" disabled={pgIndex === 0} onClick={((val) => { setPageIndex(pgIndex-1) })}>
                            <ArrowCircleLeftOutlinedIcon fontSize='large' />
                          </IconButton>
                            <MUISelect
                              value={pgIndex}
                              label="Page"
                              onChange={((val) => { setPageIndex(!val ? 0 : val.target.value as number) })}
                              >
                              {[...new Array(dataLength)].map((v, i) => (
                                <MenuItem value={i} key={`pg-${i}`}>{i+1}</MenuItem>
                              ))}
                          </MUISelect>
                          <IconButton aria-label="go to right page" disabled={pgIndex === dataLength-1} onClick={((val) => { setPageIndex(pgIndex+1) })}>
                            <ArrowCircleRightOutlinedIcon fontSize='large' />
                          </IconButton>
                        </div>
                        
                        <hr style={{borderTopWidth: '2px', borderColor: '#f6a536'}} />

                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container spacing={2}>
                            {data.slice(beginIndex, endIndex).map((item: RelatedVideo) => {

                              const selected = singleSelection ? (currentVideo as any).value === (item as RelatedVideo).value : _.map(currentVideos, 'value').includes((item as RelatedVideo).value);
                              console.log(selected, currentVideo)
                              return (
                                <Grid item xs={3} key={item.value}>
                                  <a style={{ position: 'relative', cursor: 'pointer'}}
                                    onClick={() => { 
                                      if(singleSelection) setVideoSingle(item as any);
                                      else setVideo(item);
                                        // Are we allowing only one video to be selected?
                                        selectionChanged(item as RelatedVideo);
                                    }}>
                                      {selected &&
                                        <div style={{position: 'absolute', top: 0, left: 0}}>
                                          <CheckCircleOutlineIcon fontSize='large' htmlColor='#f6a536' />
                                        </div>
                                      }
                                    <img
                                      src={item.thumbSm}
                                      style={{opacity: selected ? .5 : 1}}
                                    />
                                    <p>{item.label}</p>
                                  </a>
                                </Grid>
                              );
                              })}
                          </Grid>
                        </Box>
                        <br />
                        <IconButton aria-label="done" onClick={(() => { done(); })}>
                          <CheckTwoToneIcon fontSize='large' color='success' />
                        </IconButton>
                      </>
                  </Box> 
                : 
                  <Box>
                    <LinearProgress />
                  </Box>
                }
          </Modal>
    );
};
export default VideoSelector;