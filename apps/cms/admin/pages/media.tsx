import React, { useState, useEffect, useCallback } from 'react';
import { PageContainer } from '@keystone-6/core/admin-ui/components';
import { create } from 'zustand';

import { useDropzone } from 'react-dropzone';
import { css as emCss } from '@emotion/css';
import axios from 'axios';
import _ from 'lodash';

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import FolderIcon from '@mui/icons-material/Folder';
import FileUploadTwoToneIcon from '@mui/icons-material/FileUploadTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';

import { Image } from '@el-next/components';
type ImageData = {
  public_id: string;
  context?: { custom?: { [key: string]: string } };
};
type ImageUsageData = { docId: string; docName: string; docCategory: string };
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
const styles = {
  item: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  imgHover: emCss`opacity: .5`,
};
const actionsStyle = { position: 'absolute', bottom: 0, right: 0 };

type Folder = { name: string; path: string };

type NavState = {
  data: any[];
  folders: Folder[];
  selectedFolders: string[];
  selectedTargetFolder: string | undefined;
  editOpen: boolean;
  altText: string | undefined;
  usageData: ImageUsageData[] | undefined;
  altTextState: string;
  confirmed: boolean;
  errorOpen: boolean;
  selectedImg: ImageData;
  pgIndex: number;
  waiting: boolean;
  uploadOpen: boolean;

  toggleConfirm: () => void;
  toggleWaiting: () => void;
  setData: (imgData: any[], folders: { name: string; path: string }[]) => void;
  setId: (id: string) => void;
  setSelectedImage: (image: any) => void;
  setSelecedFolders: (event: SelectChangeEvent<string[]>) => void;
  setSelectedTargetFolder: (event: string) => void;
  setAltText: (txt: string) => void;
  setAltTextState: (state: string) => void;
  setIndex: (imgIndex: number) => void;
  setErrorOpen: (open: boolean) => void;
  setUploadOpen: (open: boolean) => void;
  setEditOpen: (open: boolean) => void;
};
export default function Media() {
  // app name is derived from first pathname string
  const app =
    window.location.protocol === 'https:'
      ? window.location.pathname.replace('/', '').split('/')[0]
      : 'elab-home-v3.x';

  const endpointPrefix =
    window.location.protocol === 'https:' ? '/api' : 'http://localhost:8000';

  const [myFiles, setMyFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    onDrop,
  });

  const removeFile = (file: File) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  // const { acceptedFiles, fileRejections } = useDropzone({});
  const acceptedFileItems = myFiles.map((file) => (
    <li key={file.name}>
      {file.name}
      <IconButton onClick={removeFile(file)}>
        <DoNotDisturbOnIcon fontSize="small" />
      </IconButton>
    </li>
  ));
  // Create store with Zustand
  const [useStore] = useState(() =>
    create<NavState>((set) => ({
      confirmed: false,
      data: [],
      folders: [],
      errorOpen: false,
      selectedImg: { public_id: '' },
      selectedFolders: [],
      selectedTargetFolder: undefined,
      altText: undefined,
      altTextState: '',
      usageData: [],
      uploadOpen: false,
      editOpen: false,
      waiting: true,
      pgIndex: 0,
      toggleConfirm: () =>
        set((state) => {
          return { confirmed: !state.confirmed };
        }),
      toggleWaiting: () =>
        set((state) => {
          return {
            waiting: !state.waiting,
          };
        }),
      setData: (imgData: any[], folders: { name: string; path: string }[]) =>
        set((state) => {
          return {
            ...state,
            data: imgData,
            folders,
          };
        }),
      setId: (id: string) =>
        set((state) => {
          return {
            ...state,
            selectedImgId: id,
          };
        }),
      setSelectedImage: (image: ImageData) => {
        let alt = '';
        let usages: ImageUsageData[] = [];
        if (image.context && image.context.custom) {
          const usageKeys = Object.keys(image.context.custom).filter((key) =>
            key.startsWith('doc_id_')
          );
          usageKeys.forEach((key) => {
            // if (image.context.custom)
            const category = image.context.custom[key].split('>')[0];
            const name = image.context.custom[key].split('>')[1];
            usages.push({
              docId: key.replace('doc_id_', ''),
              docCategory: category,
              docName: name,
            });
          });
          if (image.context.custom['alt']) alt = image.context.custom['alt'];
        }
        set((state) => {
          return {
            ...state,
            selectedImg: image,
            altText: alt,
            usageData: usages,
          };
        });
      },
      setSelecedFolders: (event: SelectChangeEvent<string[]>) =>
        set((state: NavState) => {
          return {
            ...state,
            selectedFolders: event.target.value as string[],
          };
        }),
      setSelectedTargetFolder: (event: string) =>
        set((state: NavState) => {
          return {
            ...state,
            selectedTargetFolder: event,
          };
        }),
      setAltText: (txt: string) =>
        set((state) => {
          return {
            ...state,
            altText: txt,
          };
        }),
      setAltTextState: (newState: string) =>
        set((state) => {
          return {
            ...state,
            altTextState: newState,
          };
        }),
      setIndex: (imgIndex: number) =>
        set((state) => {
          return {
            ...state,
            pgIndex: imgIndex,
          };
        }),
      setEditOpen: (open: boolean) => {
        if (!open) {
          setMyFiles([]);
        }

        set((state) => {
          return {
            ...state,
            editOpen: open,
            altTextState: '',
            confirmed: false,
          };
        });
      },
      setErrorOpen: (open: boolean) =>
        set((state) => {
          if (!open) toggleWaiting();

          return {
            ...state,
            errorOpen: open,
          };
        }),
      setUploadOpen: (open: boolean) => {
        if (!open) setMyFiles([]);

        set((state) => {
          return {
            ...state,
            uploadOpen: open,
          };
        });
      },
    }))
  );

  const {
    confirmed,
    editOpen,
    errorOpen,
    selectedImg,
    selectedFolders,
    selectedTargetFolder,
    altText,
    altTextState,
    usageData,
    folders,
    data,
    waiting,
    pgIndex,
    uploadOpen,

    toggleConfirm,
    toggleWaiting,
    setData,
    setEditOpen,
    setErrorOpen,
    setId,
    setSelectedImage,
    setSelecedFolders,
    setSelectedTargetFolder,
    setAltText,
    setAltTextState,
    setIndex,
    setUploadOpen,
  } = useStore((state) => state);

  const filteredData = data.filter(
    // If selected filters empty, show all...
    (item) =>
      selectedFolders.length === 0 ||
      // ...otherwise, item's filters must match ALL selected filters
      selectedFolders.indexOf(item.folder) > -1
  );

  const beginIndex = pgIndex * 30;
  const endIndex = beginIndex + 30;
  const dataLength = Math.floor(filteredData.length / 30) + 1;
  const refreshMedia = () => {
    // toggleWaiting();
    axios
      .get(
        `${endpointPrefix}/media/get/${
          app === 'elab' ? 'elab-home-v3.x' : app
        }/upload`
      )
      .then((response) => {
        setData(response.data.imgs, response.data.folders);
        toggleWaiting();
      });
  };

  const upload = (publicId?: string) => {
    try {
      const reader = new FileReader();
      reader.onabort = () => {
        setErrorOpen(true);
      };
      reader.onerror = () => {
        setErrorOpen(true);
      };
      reader.onload = () => {
        toggleWaiting();
        try {
          var formData = new FormData();
          formData.append('img', reader.result as string);
          formData.append('app', app === 'elab' ? 'elab-home-v3.x' : app);
          formData.append('folder', selectedTargetFolder as string);
          formData.append('alt', altText as string);
          if (publicId) {
            formData.append('overwrite', 'true');
            formData.append('public_id', publicId);
          }

          var xhr = new XMLHttpRequest();
          xhr.open('POST', `${endpointPrefix}/media/upload`, true);
          xhr.onprogress = (e) => {
            if (e.loaded !== e.total) return;

            setTimeout(() => {
              setUploadOpen(false);
              setEditOpen(false);
              refreshMedia();
            }, 2500);
          };
          xhr.onabort = () => {
            setErrorOpen(true);
          };
          xhr.onerror = () => {
            setErrorOpen(true);
          };
          xhr.send(formData);
        } catch (err) {
          setErrorOpen(true);
        }
      };
      reader.readAsDataURL(myFiles[0]);
    } catch (err) {
      setErrorOpen(true);
    }
  };
  const deleteImg = () => {
    try {
      axios
        .get(`${endpointPrefix}/media/delete?id=${selectedImg.public_id}`)
        .then((response) => {
          if (response.data.result === 'ok') {
            setEditOpen(false);
            toggleWaiting();

            refreshMedia();
            return;
          }
          setErrorOpen(true);
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    } catch (err: any) {
      setErrorOpen(true);
    }
  };
  const updateImg = () => {
    setAltTextState('waiting');
    try {
      axios
        .get(
          `${endpointPrefix}/media/update?id=${selectedImg.public_id}&alt=${altText}`
        )
        .then((response) => {
          if (response.data === 'ok') {
            // setEditOpen(false);

            // toggleWaiting();
            setAltTextState('done');
            // refreshMedia();
            return;
          }
          setErrorOpen(true);
        })
        .catch((error) => {
          setErrorOpen(true);
          setAltTextState('error');
        });
    } catch (err: any) {
      setErrorOpen(true);
      setAltTextState('error');
    }
  };

  useEffect(() => {
    if (data && data.length > 1) return;
    refreshMedia();
  });
  return (
    <PageContainer header="Media Library">
      <Modal
        open={uploadOpen}
        onClose={() => {
          setUploadOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <section className="container">
            <FormControl sx={{ m: 1, width: 250 }}>
              <InputLabel id="folders-sel-label">
                Assign to Folder (optional):
              </InputLabel>
              <Select
                labelId="folders-sel-label"
                id="folders-sel"
                value={selectedTargetFolder}
                onChange={(val) => {
                  setSelectedTargetFolder(val.target.value);
                }}
                input={<OutlinedInput id="select-fld" label="Chip" />}
                MenuProps={MenuProps}
              >
                {folders.map((folder) => (
                  <MenuItem
                    key={folder.path}
                    value={folder.path}
                    // style={getStyles(folder, personName, theme)}
                  >
                    {/* Format folder name */}
                    {folder.name
                      .replaceAll('-', ' ')
                      .split(' ')
                      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }}>
              <TextField
                label="Alt Text (optional):"
                helperText="If not specified, this must be written on a per-document usage basis"
                id="alt-text"
                multiline={true}
                rows={4}
                onChange={(val) => {
                  setAltText(val.target.value);
                }}
              />
            </FormControl>
            <div
              {...getRootProps({
                className: 'dropzone',
                style: { backgroundColor: '#FFF1DB', padding: '1rem' },
              })}
            >
              <input {...getInputProps()} />
              <p>Drag and drop an image here, or click to select one.</p>
              <em>(Only *.jpeg and *.png images will be accepted)</em>
            </div>
            {acceptedFileItems.length > 0 && (
              <aside>
                <h4>Accepted files</h4>
                <ul>{acceptedFileItems}</ul>
                <br />

                <LoadingButton
                  loading={waiting}
                  loadingPosition="start"
                  startIcon={<FileUploadTwoToneIcon />}
                  variant="outlined"
                  color="success"
                  onClick={() => {
                    upload();
                  }}
                >
                  Done
                </LoadingButton>
              </aside>
            )}{' '}
          </section>
        </Box>
      </Modal>
      {!waiting ? (
        <div>
          <Dialog
            open={editOpen}
            onClose={() => {
              setEditOpen(false);
              setId('');
            }}
            maxWidth="xl"
            fullWidth={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Image Actions</DialogTitle>
            <Paper sx={{ p: '2rem' }}>
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}
              >
                <Image
                  id={selectedImg.public_id}
                  alt={`Image with public ID ${selectedImg.public_id}`}
                  imgId={selectedImg.public_id}
                  width={500}
                  transforms="f_auto,dpr_auto,c_crop,g_center,q_10"
                  lazy={false}
                  aspectDefault={true}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <TextField
                    label="Change Alt Text"
                    helperText="If not specified, this must be written on a per-document usage basis"
                    id="alt-text"
                    multiline={true}
                    rows={4}
                    defaultValue={selectedImg.context?.custom?.alt}
                    onChange={(val) => {
                      setAltText(val.target.value);
                    }}
                  />
                  <Box sx={{ display: 'flex' }}>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => updateImg()}
                    >
                      Update
                    </Button>
                    {altTextState === 'waiting' && (
                      <CircularProgress sx={{ p: '.4rem' }} />
                    )}
                    {altTextState === 'done' && (
                      <DoneIcon sx={{ p: '.4rem' }} />
                    )}
                  </Box>
                  <hr />
                  {!usageData || usageData?.length === 0 ? (
                    <p>
                      <QueryBuilderRoundedIcon />
                      No Usage
                    </p>
                  ) : (
                    <List
                      sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                      }}
                      component="nav"
                      subheader={<h4>Usage:</h4>}
                    >
                      {usageData?.map((data) => (
                        <ListItemButton component="a" href={data.docId}>
                          <ListItemText
                            primary={data.docName}
                            secondary={data.docCategory}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  )}
                </div>
              </div>
              <div
                {...getRootProps({
                  className: 'dropzone',
                  style: {
                    backgroundColor: '#FFF1DB',
                    padding: '1rem',
                    marginTop: '1rem',
                  },
                })}
              >
                <input {...getInputProps()} />
                <h3 style={{ fontWeight: 'bold' }}>Replace this Image</h3>
                <p>Drag and drop an image here, or click to select one.</p>
                <em>(Only *.jpeg and *.png images will be accepted)</em>
              </div>
              {acceptedFileItems.length > 0 && (
                <aside>
                  <h4>Accepted files</h4>
                  <ul>{acceptedFileItems}</ul>
                  <br />

                  <LoadingButton
                    loading={waiting}
                    loadingPosition="start"
                    startIcon={<FileUploadTwoToneIcon />}
                    variant="text"
                    color="warning"
                    onClick={() => {
                      upload(selectedImg.public_id);
                    }}
                  >
                    Replace Image
                  </LoadingButton>
                </aside>
              )}{' '}
              <br />
            </Paper>
            <Paper elevation={3} sx={{ p: '2rem' }}>
              <Divider />
              <DialogContentText id="alert-dialog-description">
                This image will be permanently deleted. If it's being used
                somewhere on this app, bugs/errors may occur.
                <br />
                <Switch
                  defaultChecked={false}
                  value={confirm}
                  onClick={() => {
                    toggleConfirm();
                  }}
                />{' '}
                I Understand
              </DialogContentText>
              <Button
                color="error"
                variant="contained"
                onClick={() => deleteImg()}
                disabled={!confirmed}
              >
                Delete
              </Button>
            </Paper>
          </Dialog>

          <Fab
            color="secondary"
            aria-label="add"
            onClick={() => {
              setUploadOpen(true);
            }}
            style={{ margin: '2rem' }}
          >
            <AddIcon />
          </Fab>
          <hr />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <IconButton
              aria-label="go to last page"
              disabled={pgIndex === 0}
              onClick={(val) => {
                setIndex(pgIndex - 1);
              }}
            >
              <ArrowCircleLeftOutlinedIcon fontSize="large" />
            </IconButton>

            <Select
              value={pgIndex}
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
            </Select>
            <IconButton
              aria-label="go to right page"
              disabled={pgIndex === filteredData.length - 1}
              onClick={(val) => {
                setIndex(pgIndex + 1);
              }}
            >
              <ArrowCircleRightOutlinedIcon fontSize="large" />
            </IconButton>
            <FormControl sx={{ m: 1, width: 600 }}>
              <InputLabel id="folders-chip-label" shrink={true}>
                Filter by Folder
              </InputLabel>
              <Select
                labelId="folders-chip-label"
                id="folders-chip"
                multiple
                notched={true}
                value={selectedFolders}
                onChange={(val) => {
                  setSelecedFolders(val);
                }}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
                  <MenuItem
                    key={folder.path}
                    value={folder.path}
                    // style={getStyles(folder, personName, theme)}
                  >
                    {/* Format folder name */}
                    {folder.name
                      .replaceAll('-', ' ')
                      .split(' ')
                      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Box sx={{ flexGrow: 1 }}>
            <ImageList variant="masonry" cols={3} gap={8}>
              {filteredData.slice(beginIndex, endIndex).map((d) => {
                return (
                  <ImageListItem
                    key={d.public_id}
                    sx={styles.item}
                    onMouseEnter={() => {
                      setId(d.public_id);
                    }}
                    onMouseLeave={() => {
                      setId('');
                    }}
                  >
                    <Image
                      id={d.public_id}
                      alt={`Image with public ID ${d.public_id}`}
                      imgId={d.public_id}
                      width={300}
                      transforms="f_auto,dpr_auto,c_crop,g_center,q_10"
                      lazy={false}
                      aspectDefault={true}
                    />
                    <ImageListItemBar
                      subtitle={
                        <>
                          <FolderIcon htmlColor="#fff" fontSize="small" />{' '}
                          &nbsp;
                          {d.folder
                            .substring(d.folder.indexOf('/') + 1)
                            .replaceAll('-', ' ')
                            .split(' ')
                            .map(
                              (s: string) =>
                                s.charAt(0).toUpperCase() + s.substring(1)
                            )
                            .join(' ')}
                        </>
                      }
                      actionIcon={
                        <>
                          {' '}
                          <IconButton
                            color="secondary"
                            size="large"
                            sx={actionsStyle}
                            aria-label="delete image"
                            onClick={() => {
                              setSelectedImage(d);
                              setEditOpen(true);
                            }}
                          >
                            <EditIcon fontSize="large" />
                          </IconButton>
                        </>
                      }
                    />
                    {d.folder
                      .substring(d.folder.indexOf('/') + 1)
                      .replaceAll('-', ' ')
                      .split(' ')
                      .map(
                        (s: string) =>
                          s.charAt(0).toUpperCase() + s.substring(1)
                      )
                      .join(' ')}
                  </ImageListItem>
                );
              })}
            </ImageList>
          </Box>
        </div>
      ) : errorOpen ? (
        <Alert severity="error">Something went wrong!</Alert>
      ) : (
        <LinearProgress />
      )}
    </PageContainer>
  );
}
