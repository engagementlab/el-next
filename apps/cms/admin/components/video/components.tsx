/** @jsxImportSource @emotion/react */
/* eslint-disable @next/next/no-img-element */
import {
  FieldProps
} from '@keystone-6/core/types';
import {
  Button
} from '@keystone-ui/button';
import {
  FieldContainer,
  FieldLabel,
  TextInput
} from '@keystone-ui/fields';
import {
  MinusCircleIcon,
  EditIcon
} from '@keystone-ui/icons';
import {
  controller
} from '@keystone-6/core/fields/types/json/views';
import React, {
  ComponentType,
  Fragment,
  useEffect,
  useState
} from 'react';

import Select, {
  components,
  GroupBase,
  OptionProps,
  Props
} from 'react-select'
import {
  css as emCss
} from '@emotion/css';
import { Box, CircularProgress, Grid, IconButton, MenuItem, Modal, Select as MUISelect } from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import create from 'zustand';
import axios from 'axios';

// const _ = require('underscore');
const videoData = require('../../../videoData');

interface RelatedVideo {
  label: string;
  value: string;
  thumb: string;
  thumbSm: string;
  caption: string;
}


type VideoGridState = {
  pgIndex: number;
  currentVideos: RelatedVideo[];
  gridOpen: boolean;
  waiting: boolean;
  data: any[];

  toggleWaiting: () => void
  setData: (vidData: any[]) => void
  setPageIndex: (pgIndex: number) => void
  setVideo: (value: RelatedVideo) => void
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
  list: {
    ul: emCss`
      list-style: none;
      margin: 1rem 0 0 0;
      padding: 0;
    `,
    li: emCss `
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      width: 100%;

      &:nth-of-type(2n) > div:nth-of-type(1) {
        background-color: white;
      }`,
    data: emCss `
      background-color: #eff3f6;
      padding: 0.5rem;
      flex: auto;
      display: flex;
      align-items: flex-start;
      flex-wrap: nowrap;
    `,
    dataLabel: emCss `
      width: 40%;
    `,
    dataHref: emCss `
      width: 60%;
    `,
    optionButton: emCss `
      margin: 0 0 0 0.5rem;
      &:hover {
        background: #2D3130;
        color: white;
      }
    `,       
  },
  imagesModal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 900,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4
  },
};
export const Field = ({
    field,
    value,
    onChange,
    autoFocus
  }: FieldProps < typeof controller > ) => {
    // const [currentValue, setCurrentValue] = useState < RelatedVideo > ();
    const [videoCaption, setVideoCaption] = useState('');
    const [index, setIndex] = useState < number | null > (null);

    // const currentVideos: RelatedVideo[] = value ? JSON.parse(value) : [];
    
    console.log(value);
          // Create store with Zustand
          const [useStore] = useState(() => 
              create<VideoGridState>(set => ({
                gridOpen: false,
                pgIndex: 0,
                data: [],
                waiting: true,
                videoUrl: value,
                currentVideos: value ? JSON.parse(value) : [],
                toggleWaiting: () => set((state) => { 
                  console.log(state.waiting)
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
                setVideo: (value: RelatedVideo) => set((state) => {
                    const videosCopy: RelatedVideo[] = [...currentVideos, value];
                    onChange(JSON.stringify(videosCopy));
                    return {
                        ...state,
                        currentVideos: videosCopy,
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
    
          const setPageIndex = useStore(state => state.setPageIndex);
          const setVideo = useStore(state => state.setVideo);
          const setGridOpen = useStore(state => state.setGridOpen);
          const toggleWaiting = useStore(state => state.toggleWaiting);
          const setData = useStore(state => state.setData);
    
          const data = useStore(state => state.data);
          const waiting = useStore(state => state.waiting);
          const gridOpen = useStore(state => state.gridOpen);
          const pgIndex = useStore(state => state.pgIndex);
          const currentVideos = useStore(state => state.currentVideos);

          const beginIndex = pgIndex * 8;
          const endIndex = beginIndex + 8;
          const dataLength = Math.floor(data.length / 8)+1;   
          
    const onSubmitNewVideo = () => {
      if (onChange) {
        const newCaption = {
          caption: videoCaption
        };
        const newVideo = {
          ...currentValue,
          ...newCaption
        };

        const videosCopy = [...currentVideos, newVideo];
        onChange(JSON.stringify(videosCopy));
        onCancel();
      }
    };

    const onDeleteVideo = (index: number) => {
      if (onChange) {
        const videosCopy = [...currentVideos];
        videosCopy.splice(index, 1);
        onChange(JSON.stringify(videosCopy));
        onCancel();
      }
    };

    const onEditVideo = (index: number) => {
      if (onChange) {
        setIndex(index);
        setCurrentValue(currentVideos[index]);
        setVideoCaption(currentVideos[index].caption);
      }
    };

    const onUpdate = () => {
      if (onChange && index !== null && currentValue) {
        const updatedCaption = {
          caption: videoCaption
        };
        const updatedVideo = {
          ...currentValue,
          ...updatedCaption
        };

        const videosCopy = [...currentVideos, updatedVideo];
        onChange(JSON.stringify(videosCopy));
        onCancel();
      }
    };

    const onCancel = () => {
      setIndex(null);
      setCurrentValue(undefined);
      setVideoCaption('');
    };

    const CustomOptionComponent = (props: OptionProps) => {
    return (
      <div>        
            <div
              className={props.cx(
                {
                  option: true,
                },
                props.className
              ) + ' ' + styles.form.option}
              ref={props.innerRef}
              aria-disabled={props.isDisabled}
              {...props.innerProps}
            >
              <p>
                {props.children}
              </p>
              <img alt={`Thumbnail image for video with title "${props.label}"`} src={(props.data as any).thumbSm} />
            </div>
      </div>
      
    )
  }

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {onChange && (
        <Fragment>

        <Button
          size="small"
          disabled={onChange === undefined}
          onClick={() => {

            if(data && data.length > 1) return;
            // Get Vimeo data
            axios.get('/cms/media/videos').then((response: { data: any[]; }) =>{
              setData(response.data);
              toggleWaiting();
            }); 
           setGridOpen(true);
          }}
          tone="positive"
        >
          Open
        </Button>
           <Modal
                  open={gridOpen}
                  onClose={() => {setGridOpen(false); }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  >  
                <Box sx={styles.imagesModal}>
                {!waiting ? 
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
                            <MenuItem value={i}>{i+1}</MenuItem>
                          ))}
                      </MUISelect>
                      <IconButton aria-label="go to right page" disabled={pgIndex === dataLength-1} onClick={((val) => { setPageIndex(pgIndex+1) })}>
                        <ArrowCircleRightOutlinedIcon fontSize='large' />
                      </IconButton>
                    </div>
                    
                    <hr style={{borderTopWidth: '2px', borderColor: '#f6a536'}} />

                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        {data.slice(beginIndex, endIndex).map((item: any, i: number) => (
                          <Grid item xs={3}>
                            <a style={{ position: 'relative', cursor: 'pointer'}}
                              onClick={(e) => { 
                                setVideo(item as RelatedVideo);
                               }}>
                              <div style={{position: 'absolute', top: 0, left: 0}}>
                                {currentVideos.includes(item as RelatedVideo) && <CheckCircleOutlineIcon fontSize='large' htmlColor='#f6a536' />}
                              </div>
                              <img
                                src={item.thumbSm}
                                // style={{opacity: videoUrl === item.value ? .5 : 1}}
                              />
                              <p>{item.label}</p>
                            </a>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>

                    <br />
                    {/* <IconButton aria-label="done" disabled={videoUrl === ''} onClick={(() => { setGridOpen(false); })}>
                      <CheckTwoToneIcon fontSize='large' color='success' />
                    </IconButton> */}
                  </>
                : 
                  <CircularProgress color='success' />
                  }
                </Box> 
              </Modal>
          {/* <div className={styles.form.field}>
            <Select
              id={field.path}
              isClearable
              autoFocus={autoFocus}
              options={videoData}
              isDisabled={onChange === undefined}
              onChange={(newValue, meta) => {setCurrentValue(newValue as RelatedVideo)}}
              value={currentValue}
              className={styles.form.select}
              components={{Option: CustomOptionComponent as ComponentType<OptionProps<RelatedVideo, boolean, GroupBase<RelatedVideo>>>}}
  
            />

          <br />
          {currentValue && (
            <div>
              <FieldLabel>Caption</FieldLabel>
              <TextInput
                type='text' 
                onChange={(e) => {setVideoCaption(e.target.value)}}
                value={videoCaption}
               />
            </div>
          )}
          <div style={{display: 'block'}}>
          {index !== null ? (
            <Fragment>
              <Button onClick={onUpdate} className={styles.form.button}>
                Update
              </Button>
              <Button onClick={onCancel} className={styles.form.button}>
                Cancel
              </Button>
            </Fragment>
          ) : (
            currentValue && (
              
              <Button tone='positive' onClick={onSubmitNewVideo} className={styles.form.button}>
              Add
              </Button>
            
            )
            )}
          </div>
          </div> */}
        </Fragment>
      )}
      <ul className={styles.list.ul}>
        {currentVideos.map((relatedLink: RelatedVideo, i: number) => {
          return (
            <li key={`related-link-${i}`} className={styles.list.li}>
              <div className={styles.list.data}>
                <div className={styles.list.dataLabel}>{relatedLink.label}</div>
                <div className={styles.list.dataLabel}>{relatedLink.caption}</div>
              </div>
              {onChange && (
                <div>
                  <Button
                    size="small"
                    onClick={() => onEditVideo(i)}
                    className={styles.list.optionButton}
                  >
                    <EditIcon size="small" color="blue" />
                  </Button>
                  <Button size="small" className={styles.list.optionButton}
                      onClick={() => onDeleteVideo(i)}>
                    <MinusCircleIcon
                      size="small"
                      color="red"
                    />
                  </Button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </FieldContainer>
  );
};
