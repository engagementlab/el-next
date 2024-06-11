/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import {
  NotEditable,
  component,
  fields,
} from '@keystone-6/fields-document/component-blocks';
import { FormField } from '@keystone-6/fields-document/dist/declarations/src/DocumentEditor/component-blocks/api';

import { FieldContainer } from '@keystone-ui/fields';
import {
  Alert,
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Modal,
  Select as MUISelect,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Script from 'next/script';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import InfoIcon from '@mui/icons-material/Info';

import { create } from 'zustand';

import { Image } from '@el-next/components';
import {
  EmbedMetadata,
  EmbedState,
  StudioPreview,
  StudioPreviewState,
} from '../../types';
import Link from 'next/link';

const axios = require('axios').default;
const _ = require('underscore');

type Folder = { name: string; path: string };

type ImageGridState = {
  id: string;
  alt: string;
  folders: Folder[];

  data: any[];
  selectedFolders: string[];

  index: number;
  altExisted: boolean;
  dataError: boolean;
  imgDataError: boolean;
  waiting: boolean;
  gridOpen: boolean;

  toggleWaiting: () => void;
  setId: (id: string) => void;
  setAlt: (id: string) => void;
  setData: (imgData: any[], folders: { name: string; path: string }[]) => void;
  setIndex: (imgIndex: number) => void;
  setSelecedFolders: (event: SelectChangeEvent<string[]>) => void;
  setGridOpen: (open: boolean) => void;
  setAltExisted: (existed: boolean) => void;
};

export interface RelatedImage {
  [key: string]: {
    publicId: null | string;
    alt?: null | string;
  };
}

export interface EmbeddedUrl {
  embed: EmbedMetadata;
}

function imageSelect({
  label,
  current,
  defaultValue = {
    image: {
      publicId: '',
      alt: '',
    },
  },
}: {
  label: string;
  current?: RelatedImage;
  defaultValue: RelatedImage;
}): FormField<RelatedImage, undefined> {
  // app name is derived from first pathname string
  let app = '';
  let endpointPrefix = '';
  return {
    kind: 'form',

    Input({ value, onChange, autoFocus }) {
      const ITEM_HEIGHT = 48;
      const ITEM_PADDING_TOP = 8;
      const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };
      // Create store with Zustand
      const [useStore] = useState(() =>
        create<ImageGridState>((set) => ({
          waiting: true,
          gridOpen: true,
          dataError: false,
          imgDataError: false,
          altExisted: false,
          data: [],
          folders: [],
          selectedFolders: [],
          index: 0,
          id:
            (value?.publicId as unknown as string) ||
            value?.image.publicId ||
            '',
          alt: (value?.alt as unknown as string) || value?.image?.alt || '',
          toggleWaiting: () =>
            set((state) => {
              return { waiting: !state.waiting };
            }),
          setId: (id: string) =>
            set((state) => {
              return {
                ...state,
                id,
              };
            }),
          setAlt: (alt: string) =>
            set((state) => {
              return {
                ...state,
                alt,
              };
            }),
          setData: (
            imgData: any[],
            folders: { name: string; path: string }[]
          ) =>
            set((state) => {
              return {
                ...state,
                data: imgData,
                folders,
              };
            }),
          setIndex: (imgIndex: number) =>
            set((state) => {
              return {
                ...state,
                index: imgIndex,
              };
            }),
          setSelecedFolders: (event: SelectChangeEvent<string[]>) =>
            set((state: ImageGridState) => {
              return {
                ...state,
                selectedFolders: event.target.value as string[],
              };
            }),
          setGridOpen: (open: boolean) =>
            set((state) => {
              return {
                ...state,
                gridOpen: open,
              };
            }),
          setAltExisted: (existed: boolean) =>
            set((state) => {
              return {
                ...state,
                altExisted: existed,
              };
            }),
        }))
      );

      const {
        id,
        alt,
        altExisted,
        gridOpen,
        selectedFolders,
        folders,
        data,
        dataError,
        imgDataError,
        index,
        waiting,
        setId,
        setAlt,
        toggleWaiting,
        setData,
        setIndex,
        setGridOpen,
        setSelecedFolders,
        setAltExisted,
      } = useStore((state) => state);

      const filteredData = data.filter(
        // If selected filters empty, show all...
        (item) =>
          selectedFolders.length === 0 ||
          // ...otherwise, item's filters must match ALL selected filters
          selectedFolders.indexOf(item.folder) > -1
      );

      const snackbarClose = () => {
        useStore.setState({
          dataError: false,
        });
      };
      const imgDataErrorClose = () => {
        useStore.setState({
          imgDataError: false,
        });
      };

      const beginIndex = index * 15;
      const endIndex = beginIndex + 15;
      const dataLength = Math.floor(filteredData.length / 15) + 1;
      const updateImgUsage = (publicId: string | null) => {
        // Assemble this item's label by obtaining the link/category and then the name of this item from the DOM
        const pageCategory = (
          document.querySelector(
            'a[class$="ItemPageHeader"]'
          ) as HTMLAnchorElement
        ).innerText;
        const pageName = document.querySelector(
          'h1[class$="ItemPageHeader"]'
        )!.textContent;
        const pageValue = `${pageCategory}>${pageName}`;
        // Get the item's ID from window location
        const docId = window.location.pathname;

        try {
          axios
            .get(
              `${endpointPrefix}/media/update/usage?public_id=${publicId}&doc_id=${docId}&doc_name=${pageValue}`
            )
            .then((response: { data: string }) => {
              if (response.data === 'ok') {
                return;
              }

              useStore.setState({
                imgDataError: true,
              });
            })
            .catch(() => {
              useStore.setState({
                imgDataError: true,
              });
            });
        } catch (err: any) {
          useStore.setState({
            imgDataError: true,
          });
        }
      };

      useEffect(() => {
        // app name is derived from first pathname string
        app =
          window.location.protocol === 'https:'
            ? window.location.pathname.replace('/', '').split('/')[0]
            : 'elab';
        endpointPrefix =
          window.location.protocol === 'https:'
            ? '/api'
            : 'http://localhost:8000';
        if (data && data.length > 1) return;

        // Get CDN data
        axios
          .get(
            `${endpointPrefix}/media/get/${
              app === 'elab' ? 'elab-home-v3.x' : app
            }/upload`
          )
          .then((response: { data: any }) => {
            let data = response.data.imgs;
            // If image pre-selected, move it to the front of array
            if (id.length > 0) {
              const itemIndex = data.findIndex(
                (item: { public_id: string }) => item.public_id === id
              );
              data.splice(0, 0, data.splice(itemIndex, 1)[0]);
            }
            setData(data, response.data.folders);
            toggleWaiting();
          })
          .catch((error: any) => {
            useStore.setState({
              dataError: true,
            });
            setGridOpen(false);
            toggleWaiting();
          });
      });

      return (
        <FieldContainer>
          <>
            <Script src="https://cdn.tailwindcss.com/3.3.0" />
            <Script>
              {`
                if(typeof tailwind !== "undefined") {
                  tailwind.config = {
                    corePlugins: {
                      preflight: false,
                    },        
                  }
                }
              `}
            </Script>
          </>
          Click <em>Done</em> for image preview.
          <Modal
            open={gridOpen}
            onClose={() => {
              setGridOpen(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <>
              {!waiting ? (
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 border-2 bg-white p-4 shadow-xl">
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <IconButton
                      aria-label="go to last page"
                      disabled={index === 0}
                      onClick={(val) => {
                        setIndex(index - 1);
                      }}
                    >
                      <ArrowCircleLeftOutlinedIcon fontSize="large" />
                    </IconButton>

                    <MUISelect
                      value={index}
                      label="Page"
                      onChange={(val) => {
                        setIndex(!val ? 0 : (val.target.value as number));
                      }}
                    >
                      {[...new Array(dataLength)].map((v, i) => (
                        <MenuItem value={i} key={i}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </MUISelect>
                    <IconButton
                      aria-label="go to right page"
                      disabled={index === dataLength - 1}
                      onClick={(val) => {
                        setIndex(index + 1);
                      }}
                    >
                      <ArrowCircleRightOutlinedIcon fontSize="large" />
                    </IconButton>
                    <FormControl sx={{ m: 1, width: 600 }}>
                      <InputLabel id="folders-chip-label">
                        Filter by Folder
                      </InputLabel>
                      <Select
                        labelId="folders-chip-label"
                        id="folders-chip"
                        multiple
                        value={selectedFolders}
                        onChange={(val) => {
                          setSelecedFolders(val);
                        }}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                          />
                        }
                        renderValue={(selected: string[]) => (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip
                                key={value}
                                label={value
                                  .substring(value.indexOf('/') + 1)
                                  .replaceAll('-', ' ')}
                              />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {folders.map((folder) => (
                          <MenuItem key={folder.path} value={folder.path}>
                            {/* Format folder name */}
                            {folder.name
                              .replaceAll('-', ' ')
                              .split(' ')
                              .map(
                                (s) =>
                                  s.charAt(0).toUpperCase() + s.substring(1)
                              )
                              .join(' ')}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <hr
                    style={{ borderTopWidth: '2px', borderColor: '#f6a536' }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {filteredData.slice(beginIndex, endIndex).map((item) => {
                        const alt =
                          item.context && item.context.custom
                            ? item.context.custom.alt
                            : '';
                        // const docUrlSegments = window.location.pathname
                        //   .replace('/', '')
                        //   .split('/')
                        //   const do
                        //   [window.location.pathname.length - 1];
                        return (
                          <Grid item xs={3} key={item.public_id}>
                            <a
                              style={{ position: 'relative' }}
                              onClick={(e) => {
                                setAlt(alt);
                                setAltExisted(
                                  item.context && item.context.custom
                                );
                                setId(item.public_id);

                                // Get current item title and doc id to include in image's metadata
                                if (id !== item.public_id) {
                                  updateImgUsage(item.public_id);
                                }
                                onChange({
                                  publicId: item.public_id,
                                  alt,
                                });
                              }}
                            >
                              <div
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                }}
                              >
                                {item.public_id === id && (
                                  <CheckCircleOutlineIcon
                                    fontSize="large"
                                    htmlColor="#f6a536"
                                  />
                                )}
                              </div>
                              <img
                                src={`https://res.cloudinary.com/engagement-lab-home/image/upload/f_auto,dpr_auto,w_100/v${item.version}/${item.public_id}`}
                                style={{
                                  opacity: item.public_id === id ? 0.5 : 1,
                                }}
                              />
                            </a>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                  {altExisted && (
                    <Alert severity="info" sx={{ marginBottom: '.4rem' }}>
                      Alt text already exists. It can be further edited for this
                      usage if needed.
                    </Alert>
                  )}
                  <TextField
                    id="alt-field"
                    multiline
                    fullWidth
                    rows={4}
                    label="Alt Text"
                    variant="standard"
                    value={alt}
                    onChange={(e) => {
                      setAlt(e.target.value);
                      onChange({
                        publicId: id as any,
                        alt: e.target.value as any,
                      });
                    }}
                    defaultValue={alt}
                  />
                  <br />
                  <IconButton
                    aria-label="done"
                    disabled={id === ''}
                    onClick={() => {
                      setGridOpen(false);
                    }}
                  >
                    <CheckTwoToneIcon fontSize="large" color="success" />
                  </IconButton>
                </Box>
              ) : (
                <Box>
                  <LinearProgress />
                </Box>
              )}

              <Snackbar
                open={imgDataError}
                autoHideDuration={5000}
                onClose={imgDataErrorClose}
                // sx={{ position: 'relative', zIndex: 1400 }}
              >
                <Alert severity="error">
                  Unable to update this image's usage data.
                </Alert>
              </Snackbar>
            </>
          </Modal>
          <Snackbar
            open={dataError}
            autoHideDuration={3000}
            onClose={snackbarClose}
          >
            <Alert severity="error">Unable to retrieve data.</Alert>
          </Snackbar>
        </FieldContainer>
      );
    },
    options: undefined,
    defaultValue,
    validate(value) {
      return typeof value === 'object';
    },
  };
}

function embedField({
  label,
  current,
  defaultValue = {
    embed: {
      title: '',
    },
  },
}: {
  label: string;
  current?: EmbedMetadata;
  defaultValue: EmbedMetadata;
}): FormField<EmbedMetadata, undefined> {
  return {
    kind: 'form',

    Input({ value, onChange, autoFocus }) {
      // Create store with Zustand
      const [useStore] = useState(() =>
        create<EmbedState>((set) => ({
          waiting: false,
          dataError: false,
          editUrl: false,
          toggleWaiting: () =>
            set((state) => {
              return { waiting: !state.waiting };
            }),
        }))
      );

      const toggleWaiting = useStore((state) => state.toggleWaiting);
      const snackbarClose = () => {
        useStore.setState({
          dataError: false,
        });
      };
      const { dataError, waiting, editUrl } = useStore((state) => state);
      const endpointPrefix =
        window.location.protocol === 'https:'
          ? '/api'
          : 'http://localhost:8000';
      const embedValue = value as EmbedMetadata[0];
      return (
        <FieldContainer>
          <TextField
            id="alt-field"
            multiline
            fullWidth
            rows={1}
            label="Paste URL to Embed here."
            variant="standard"
            value={embedValue && !editUrl ? embedValue.open_graph?.url : null}
            onChange={(e) => {
              useStore.setState({
                editUrl: true,
              });
              toggleWaiting();
              axios
                .post(`${endpointPrefix}/embed`, { url: e.target.value })
                .then((response: { data: any }) => {
                  let data = response.data;
                  toggleWaiting();
                  onChange(data);
                })
                .catch((error: any) => {
                  toggleWaiting();
                  useStore.setState({
                    dataError: true,
                  });
                });
            }}
          />
          {waiting && (
            <Box>
              <LinearProgress />
            </Box>
          )}
          <Snackbar
            open={dataError}
            autoHideDuration={10000}
            onClose={snackbarClose}
          >
            <Alert severity="error">
              Unable to retrieve embed data. It is possible that this URL does
              not support it.
            </Alert>
          </Snackbar>
        </FieldContainer>
      );
    },
    options: undefined,
    defaultValue,
    validate(value) {
      return typeof value === 'object';
    },
  };
}

function semesterSelect({
  label,
  current,
  defaultValue = null,
}: {
  label: string;
  current?: any;
  defaultValue: any;
}): FormField<any, undefined> {
  return {
    kind: 'form',

    Input({ value, onChange, autoFocus }) {
      // Create store with Zustand
      const [useStore] = useState(() =>
        create<StudioPreviewState>((set) => ({
          waiting: true,
          dataError: false,
          data: [],
          selectedSemester: value || null,
          toggleWaiting: () =>
            set((state) => {
              return { waiting: !state.waiting };
            }),
        }))
      );

      const toggleWaiting = useStore((state) => state.toggleWaiting);
      const snackbarClose = () => {
        useStore.setState({
          dataError: false,
        });
      };
      const { dataError, waiting, data, selectedSemester } = useStore(
        (state) => state
      );

      useEffect(() => {
        if (data && data.length > 1) return;

        const endpoint =
          window.location.protocol === 'https:'
            ? '/rest/semesters'
            : 'http://localhost:3000/rest/semesters';

        axios
          .get(endpoint)
          .then((response: { data: any }) => {
            let data = response.data;
            toggleWaiting();
            // onChange(data);

            useStore.setState({
              data,
            });
          })
          .catch((error: any) => {
            toggleWaiting();
            useStore.setState({
              dataError: true,
            });
          });
      });
      return (
        <FieldContainer>
          {waiting && (
            <Box>
              <LinearProgress />
            </Box>
          )}
          <FormControl fullWidth>
            <InputLabel id="semester-select-label">
              Select a Semester
            </InputLabel>
            <Select
              value={selectedSemester?.key}
              labelId="semester-select-label"
              label="Select a Semester"
              onChange={(val) => {
                const thisSemester = data.find(
                  (d) => d.key === val.target.value
                );
                onChange(thisSemester);
                useStore.setState({
                  selectedSemester: thisSemester,
                });
              }}
            >
              {data.map((semester) => (
                <MenuItem value={semester.key}>
                  {semester.name.split(' - ')[0]}
                  <br />
                  <div
                    style={{
                      display: 'contents',
                      color: 'gray',
                      textTransform: 'uppercase',
                      fontSize: '10px',
                    }}
                  >
                    {semester.studio.name.substring(0, 40)}
                    {semester.studio.name.length > 39 && '...'}
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Snackbar
            open={dataError}
            autoHideDuration={10000}
            onClose={snackbarClose}
          >
            <Alert severity="error">Unable to retrieve studio data.</Alert>
          </Snackbar>
        </FieldContainer>
      );
    },
    options: undefined,
    defaultValue,
    validate(value: any) {
      return typeof value === 'object';
    },
  };
}

const defaultHtmlEmbedValue = 'Use this instead of embedding URL';

export const componentBlocks = {
  image: component({
    preview: (props) => {
      const publicId =
        props.fields.image.value.publicId ||
        props.fields.image.value.image.publicId;
      const alt =
        props.fields.image.value.alt || props.fields.image.value.image?.alt;

      return (
        <>
          {!publicId ? (
            <span>
              Click <em>Edit</em>
            </span>
          ) : (
            <div>
              <img
                src={`https://res.cloudinary.com/engagement-lab-home/image/upload/f_auto,dpr_auto,w_250/${publicId}`}
              />
              {alt && (
                <em>
                  <>(Alt: {alt})</>
                </em>
              )}
            </div>
          )}
        </>
      );
    },
    label: 'Image',
    schema: {
      image: imageSelect({
        label: 'Image',
        defaultValue: {
          image: {
            publicId: null,
          },
        },
      }),
      caption: fields.text({
        label: 'Caption',
        defaultValue: 'Optional',
      }),
    },
  }),
  button: component({
    preview: (props) => {
      return (
        <div
          style={{
            backgroundColor: 'rgb(247 247 247)',
            display: 'inline-block',
            borderRadius: '38px',
            padding: '1rem',
          }}
          className="inline-block rounded-full px-8 py-5 uppercase bg-lynx text-bluegreen border-2 border-bluegreen"
        >
          <div style={{ fontWeight: 'bold', color: '#718096' }}>
            {props.fields.label.element}
          </div>

          <div style={{ fontStyle: 'italic', color: '#4A5568' }}>
            <NotEditable>
              <svg
                viewBox="70.001 0.006 10 10"
                width="10"
                height="10"
                style={{ marginLeft: '.5rem' }}
              >
                <g transform="matrix(0.017858, 0, 0, 0.017858, 68.750916, 0.006137)">
                  <path d="m586.27 43.738c-58.324-58.309-152.88-58.309-211.19 0l-83.328 83.293c6.5977-0.71875 13.262-1.0273 19.961-1.0273 21.086 0 41.594 3.3516 61.008 9.8086l47.219-47.199c16.219-16.234 37.785-25.156 60.719-25.156 22.938 0 44.504 8.9219 60.719 25.156 16.219 16.199 25.137 37.734 25.137 60.699 0 22.934-8.918 44.5-25.137 60.699l-92.383 92.383c-16.219 16.242-37.785 25.16-60.719 25.16-22.969 0-44.5-8.918-60.734-25.152-7.8945-7.8633-14.047-17.023-18.285-27.004-10.527 0.58203-20.371 4.957-27.891 12.473l-24.609 24.641c6.7344 12.473 15.379 24.23 25.906 34.797 58.309 58.312 152.88 58.312 211.2 0l92.398-92.418c58.293-58.305 58.293-152.84 0.003907-211.15z"></path>
                  <path d="m389.27 433.96c-21.121 0-41.832-3.418-61.691-10.152l-47.543 47.543c-16.199 16.234-37.766 25.156-60.699 25.156-22.934 0-44.465-8.918-60.699-25.156-16.234-16.203-25.156-37.766-25.156-60.699 0-22.934 8.9219-44.504 25.156-60.734l92.383-92.383c16.234-16.199 37.766-25.121 60.699-25.121 22.969 0 44.5 8.9219 60.715 25.121 7.8984 7.8945 14.062 17.055 18.32 27.035 10.562-0.54688 20.422-4.957 27.941-12.473l24.574-24.609c-6.7344-12.512-15.398-24.266-25.941-34.828-58.309-58.309-152.88-58.309-211.19 0l-92.383 92.418c-58.34 58.312-58.34 152.84 0 211.19 58.309 58.312 152.84 58.312 211.15 0l83.188-83.191c-6.2031 0.57813-12.473 0.89063-18.797 0.89063z"></path>
                </g>
              </svg>
            </NotEditable>
            {props.fields.link.element}
            <NotEditable>
              <Tooltip
                title={
                  <Typography variant="caption" color="inherit">
                    If link is to a page on this app, use the format
                    "/this/is/a-link". If it's an external link, you must use
                    the format "https://www.linkhere.org". If you are pasting
                    the link, make sure no other characters end up in this field
                    (e.g. ")").
                  </Typography>
                }
              >
                <IconButton aria-haspopup="true">
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </NotEditable>
          </div>
        </div>
      );
    },
    label: 'Button',
    schema: {
      label: fields.child({
        kind: 'inline',
        placeholder: 'Label',
      }),
      link: fields.child({
        kind: 'inline',
        placeholder: '/link/here',
      }),
      cta: fields.checkbox({
        label: 'Is CTA',
      }),
    },
    // chromeless: true,
  }),
  pageAnchor: component({
    preview: (props) => {
      return (
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: '1rem',
              backgroundColor: '#f5f5f5',
              padding: '.5rem',
            }}
          >
            <NotEditable>
              <Tooltip
                title={
                  <Typography variant="caption" color="inherit">
                    Users will be scrolled to this element if a link is made
                    elsewhere with content matching the format:
                    "#must-be-this-format"
                  </Typography>
                }
              >
                <IconButton aria-haspopup="true">
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </NotEditable>
            {props.fields.anchorId.element}
          </span>
        </div>
      );
    },
    label: 'In-page Anchor',
    schema: {
      anchorId: fields.child({
        kind: 'inline',
        placeholder: 'must-be-this-format',
      }),
    },
    chromeless: true,
  }),
  associatedPeople: component({
    label: 'Associated People',
    preview: (props) => {
      return (
        <>
          <NotEditable>{props.fields.title.element}</NotEditable>
          <FormControlLabel
            control={
              <Checkbox disabled checked={props.fields.showTitles.value} />
            }
            label="Show titles"
          ></FormControlLabel>
          {props.fields.selectedPeople.value.length > 0 && (
            <p>
              <strong>Show only:</strong>
            </p>
          )}
          {props.fields.selectedPeople.value.map((value, index) => {
            return <div key={index}>{value.label}</div>;
          })}
        </>
      );
    },
    schema: {
      title: fields.child({
        kind: 'inline',
        placeholder: 'Associated people will appear here.',
      }),
      showTitles: fields.checkbox({ label: 'Show titles' }),
      selectedPeople: fields.relationship({
        listKey: 'Person',
        label: 'Show only these people (optional):',
        selection: 'key name title abbreviatedTitle',
        many: true,
      }),
    },
  }),
  slideshow: component({
    label: 'Slideshow',
    preview: (props) => {
      return (
        <>
          <NotEditable>
            {props.fields.slideshow.value?.data.slides.map(
              (
                value: { image: { publicId: string }; altText: string },
                index: number
              ) => {
                return (
                  <span style={{ marginLeft: '5px' }}>
                    <Image
                      id={`img-preview-${index}`}
                      imgId={value.image.publicId}
                      alt={value.altText}
                      width={30}
                    />
                  </span>
                );
              }
            )}
          </NotEditable>
        </>
      );
    },
    schema: {
      slideshow: fields.relationship({
        listKey: 'Slideshow',
        label: 'Select:',
        selection:
          'key name slides { image {publicId publicUrl} altText caption video {file thumbUrl} order }',
      }),
    },
  }),
  embed: component({
    preview: (props) => {
      const embed = props.fields.embed.value as EmbedMetadata[0];
      if (embed.oEmbed || props.fields.html.value) {
        const html =
          embed.oEmbed?.html ||
          (props.fields.html.value === defaultHtmlEmbedValue
            ? ''
            : props.fields.html.value.replace(
                '"></iframe>',
                "\" style='max-width: 150px;'></iframe>"
              ));
        return (
          <div
            style={{ maxWidth: '150px' }}
            dangerouslySetInnerHTML={{
              __html: html as string,
            }}
          />
        );
      } else if (
        embed.twitter_card?.players &&
        embed.twitter_card?.players?.length > 0
      )
        return <iframe src={(embed.twitter_card?.players[0] as any).url} />;
      else if (embed.open_graph?.images)
        return (
          <>
            <p>
              <strong>{embed.open_graph.title}</strong>
            </p>
            <img width={80} src={embed.open_graph.images[0].url} />
          </>
        );
      else if (props.fields.embed && props.fields.embed['value']['title'])
        return <>{props.fields.embed['value']['title']}</>;
      else return <div>No data! </div>;
      // <div>{props.fields.embed.value[0].embed.title}</div>;
    },
    label: 'Embed',
    schema: {
      embed: embedField({
        label: 'Embed a URL',
        defaultValue: {
          embed: {
            title: 'Embed a URL',
          },
        },
      }),
      html: fields.text({
        label: 'Embed HTML',
        defaultValue: defaultHtmlEmbedValue,
      }),
    },
  }),
  iconLink: component({
    label: 'Link with Icon',
    preview: (props) => {
      return (
        <>
          <NotEditable>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {props.fields.icon.value === 'article' && (
                <svg height="20" width="20" viewBox="0 -960 960 960">
                  <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h462l198 198v462q0 24-18 42t-42 18H180Zm0-60h600v-428.571H609V-780H180v600Zm99-111h402v-60H279v60Zm0-318h201v-60H279v60Zm0 159h402v-60H279v60Zm-99-330v171.429V-780v600-600Z" />
                </svg>
              )}
              {props.fields.icon.value === 'action' && (
                <svg height="20" width="20" viewBox="0 -960 960 960">
                  <path d="m438-441 192-192-43-43-149 149-65-65-43 43 108 108Zm42 282q133-121 196.5-219.5T740-552q0-118-75.5-193T480-820q-109 0-184.5 75T220-552q0 75 65 173.5T480-159Zm0 79Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                </svg>
              )}
              {props.fields.icon.value === 'website' && (
                <svg height="20" viewBox="0 -960 960 960" width="20">
                  <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h279v60H180v600h600v-279h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60v-218L382-339Z" />
                </svg>
              )}
              {props.fields.icon.value === 'app' && (
                <svg height="20" viewBox="0 -960 960 960" width="20">
                  <path d="M480-313 287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z" />
                </svg>
              )}
              {props.fields.icon.value === 'video' && (
                <svg height="20" width="20" viewBox="0 -960 960 960">
                  <path d="m392-313 260-169-260-169v338ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z" />
                </svg>
              )}
              <Link
                href={props.fields.url.value}
                target="_blank"
                style={{ color: '#5EB89E' }}
              >
                {props.fields.label.value}
              </Link>
            </div>
          </NotEditable>
        </>
      );
    },
    schema: {
      label: fields.text({ defaultValue: 'Label', label: 'Label' }),
      url: fields.text({ defaultValue: 'https://org.org', label: 'URL' }),
      icon: fields.select({
        label: 'Icon',
        options: [
          { label: 'Article', value: 'article' },
          { label: 'Action', value: 'action' },
          { label: 'Website', value: 'website' },
          { label: 'App', value: 'app' },
          { label: 'Video', value: 'video' },
        ],
        defaultValue: 'article',
      }),
    },
  }),
  studioPreview: component({
    label: 'Studio Preview',
    preview: (props) => {
      const semester = props.fields.semester.value as StudioPreview;
      return (
        <>
          {semester && semester.name ? (
            <NotEditable>
              <p style={{ fontWeight: 'bold' }}>
                {semester.name.split(' - ')[0]}
              </p>

              <div
                style={{
                  color: 'gray',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                }}
              >
                {semester.studio.name.substring(0, 40)}
                {semester.studio.name.length > 39 && '...'}
              </div>
            </NotEditable>
          ) : (
            <span>
              Click <em>Edit</em>
            </span>
          )}
        </>
      );
    },
    schema: {
      semester: semesterSelect({
        label: 'semester',
        current: null,
        defaultValue: null,
      }),
    },
  }),
};
