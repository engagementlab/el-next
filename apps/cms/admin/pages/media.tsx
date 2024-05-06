import React, { useState, useEffect, useCallback } from 'react';
import { PageContainer } from '@keystone-6/core/admin-ui/components';
import { create } from 'zustand';

import { useDropzone } from 'react-dropzone';
import { css as emCss } from '@emotion/css';
import axios from 'axios';
import _ from 'lodash';

import {
  Alert,
  Backdrop,
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
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Switch,
  TextField,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import DoneIcon from '@mui/icons-material/Done';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import FolderIcon from '@mui/icons-material/Folder';
import FileUploadTwoToneIcon from '@mui/icons-material/FileUploadTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckIcon from '@mui/icons-material/Check';

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
  fileDownloadUrl: string;
  confirmed: boolean;
  errorOpen: boolean;
  selectedImg: ImageData;
  pgIndex: number;
  waiting: boolean;
  imageUploadOpen: boolean;
  fileUploadOpen: boolean;
  copied: boolean;

  toggleConfirm: () => void;
  toggleWaiting: () => void;
  setData: (imgData: any[], folders: { name: string; path: string }[]) => void;
  setId: (id: string) => void;
  setSelectedImage: (image: any) => void;
  setSelecedFolders: (event: SelectChangeEvent<string[]>) => void;
  setSelectedTargetFolder: (event: string) => void;
  setAltText: (txt: string) => void;
  setAltTextState: (state: string) => void;
  setFileDownloadUrl: (url: string) => void;
  setIndex: (imgIndex: number) => void;
  setErrorOpen: (open: boolean) => void;
  setImageUploadOpen: (open: boolean) => void;
  setFileUploadOpen: (open: boolean) => void;
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

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    onDrop: useCallback(
      (acceptedFiles: any) => {
        setImageFiles([...imageFiles, ...acceptedFiles]);
      },
      [imageFiles]
    ),
  });
  const otherFileDropzone = useDropzone({
    maxFiles: 1,
    maxSize: 1024 * 1024 * 100,
    onDrop: useCallback(
      (acceptedFiles: any) => {
        setFiles([...files, ...acceptedFiles]);
      },
      [files]
    ),
  });

  const removeImageFile = (file: File) => () => {
    const newFiles = [...imageFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setImageFiles(newFiles);
  };
  const removeFile = (file: File) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const acceptedImages = imageFiles.map((file) => (
    <li key={file.name}>
      {file.name}
      <IconButton onClick={removeImageFile(file)}>
        <DoNotDisturbOnIcon fontSize="small" />
      </IconButton>
    </li>
  ));
  const acceptedFiles = files.map((file) => (
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
      fileDownloadUrl: '',
      usageData: [],
      imageUploadOpen: false,
      fileUploadOpen: false,
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
      setFileDownloadUrl: (newState: string) =>
        set((state) => {
          return {
            ...state,
            fileDownloadUrl: newState,
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
          setImageFiles([]);
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
      setImageUploadOpen: (open: boolean) => {
        if (!open) setImageFiles([]);
        set((state) => {
          return {
            ...state,
            imageUploadOpen: open,
          };
        });
      },
      setFileUploadOpen: (open: boolean) => {
        if (!open) setFiles([]);
        set((state) => {
          return {
            ...state,
            fileUploadOpen: open,
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
    fileDownloadUrl,
    usageData,
    folders,
    data,
    waiting,
    pgIndex,
    imageUploadOpen,
    fileUploadOpen,
    copied,

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
    setFileDownloadUrl,
    setIndex,
    setImageUploadOpen,
    setFileUploadOpen,
  } = useStore((state) => state);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const filteredData = data.filter(
    // If selected filters empty, show all...
    (item) =>
      selectedFolders.length === 0 ||
      // ...otherwise, item's filters must match ALL selected filters
      selectedFolders.indexOf(item.folder) > -1
  );

  /**
   * Copy URL to clipboard
   * @function
   * @param {String} [url] - URL to copy to clipboard
   */
  const copyUrl = async (url: string) => {
    navigator.clipboard.writeText(url);
    useStore.setState({ copied: true });
  };

  const actions = [
    { icon: <ImageIcon />, name: 'Image', function: setImageUploadOpen },
    {
      icon: <InsertDriveFileIcon />,
      name: 'Other',
      function: setFileUploadOpen,
    },
  ];
  const beginIndex = pgIndex * 30;
  const endIndex = beginIndex + 30;
  const dataLength = Math.floor(filteredData.length / 30) + 1;

  // IMAGE MANAGEMENT
  const refreshMedia = () => {
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
              setImageUploadOpen(false);
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
      reader.readAsDataURL(imageFiles[0]);
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

  // FILE MANAGEMENT
  const uploadFile = async () => {
    try {
      const reader = new FileReader();
      const makeRequest = async (
        file: string | ArrayBuffer | null = null,
        fileName: string
      ) => {
        try {
          toggleWaiting();
          const data = new FormData();
          const blob = new Blob([file as ArrayBuffer], {
            type: 'multipart/form-data',
          });
          data.append('file', blob, fileName);

          var xhr = new XMLHttpRequest();
          xhr.open('POST', `${endpointPrefix}/file/upload`, true);
          xhr.send(data);

          xhr.onload = () => {
            if (xhr.readyState === xhr.DONE) {
              toggleWaiting();
              if (xhr.status === 200) {
                setFileDownloadUrl(JSON.parse(xhr.response).url);

                return;
              }
              setErrorOpen(true);
            }
          };
          xhr.onabort = () => {
            setErrorOpen(true);
          };
          xhr.onerror = () => {
            setErrorOpen(true);
          };
        } catch (err) {
          setFileUploadOpen(false);
          setFileDownloadUrl('');
          setErrorOpen(true);
        }
      };

      reader.onabort = () => {
        setErrorOpen(true);
      };
      reader.onerror = () => {
        setErrorOpen(true);
      };
      reader.onload = async () => {
        makeRequest(reader.result, files[0].name);
      };

      if (acceptedFiles[0]) reader.readAsArrayBuffer(files[0]);
    } catch (err) {
      console.error(err);
      setErrorOpen(true);
    }
  };

  useEffect(() => {
    if (data && data.length > 1) return;
    refreshMedia();
  });

  return (
    <PageContainer header="Media Library">
      {/* IMAGE UPLOAD */}
      <Modal
        open={imageUploadOpen}
        onClose={() => {
          setImageUploadOpen(false);
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
            {acceptedImages.length > 0 && (
              <aside>
                <h4>Accepted files</h4>
                <ul>{acceptedImages}</ul>
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

      {/* OTHER FILE UPLOAD */}
      <Modal
        open={fileUploadOpen}
        onClose={() => {
          setFileUploadOpen(false);
          setFileDownloadUrl('');
          useStore.setState({ copied: false });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <section className="container">
            {fileDownloadUrl.length === 0 ? (
              <>
                <div
                  {...otherFileDropzone.getRootProps({
                    className: 'dropzone',
                    style: { backgroundColor: '#FFF1DB', padding: '1rem' },
                  })}
                >
                  <input {...otherFileDropzone.getInputProps()} />
                  <p>Drag and drop a file here, or click to select one.</p>
                  <p style={{ fontWeight: 'bold' }}>(100 MB size limit).</p>
                </div>
                {acceptedFiles.length > 0 && (
                  <aside>
                    <h4>Accepted file</h4>
                    <ul>{acceptedFiles}</ul>
                    <br />
                    <p>(Large files may take awhile.)</p>
                    <LoadingButton
                      loading={waiting}
                      loadingPosition="start"
                      startIcon={<FileUploadTwoToneIcon />}
                      variant="outlined"
                      color="success"
                      onClick={() => {
                        uploadFile();
                      }}
                    >
                      Done
                    </LoadingButton>
                  </aside>
                )}
              </>
            ) : (
              <>
                <h2>File Uploaded.</h2>
                <a href={fileDownloadUrl} target="_blank">
                  {fileDownloadUrl}
                </a>
                {copied ? (
                  <CheckIcon htmlColor="#00d103" />
                ) : (
                  <Button
                    disableElevation
                    size="small"
                    aria-label="copy url"
                    onClick={() => {
                      copyUrl(fileDownloadUrl);
                    }}
                    startIcon={<ContentCopyIcon />}
                  />
                )}
              </>
            )}
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
              {acceptedImages.length > 0 && (
                <aside>
                  <h4>Accepted files</h4>
                  <ul>{acceptedImages}</ul>
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
          <Box sx={{ position: 'fixed', right: '2rem', bottom: '2rem' }}>
            <Backdrop open={open} />
            <SpeedDial
              ariaLabel="add"
              sx={{ position: 'absolute', bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
              onClose={handleClose}
              onOpen={handleOpen}
              open={open}
              color="secondary"
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipOpen
                  onClick={() => {
                    action.function(true);
                    handleClose();
                  }}
                />
              ))}
            </SpeedDial>
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
