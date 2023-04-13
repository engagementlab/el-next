import React, { useState, useEffect } from 'react';
import { PageContainer } from '@keystone-6/core/admin-ui/components';
import create from 'zustand';
import { useDropzone } from 'react-dropzone';
import { css as emCss } from '@emotion/css';
import axios from 'axios';
import _ from 'lodash';

import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  LinearProgress,
  MenuItem,
  Modal,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
  Theme,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AddIcon from '@mui/icons-material/Add';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import FolderIcon from '@mui/icons-material/Folder';
import FileUploadTwoToneIcon from '@mui/icons-material/FileUploadTwoTone';

import Image from '@el-next/components/image';

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
function getStyles(
  folder: string,
  personName: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      personName.indexOf(folder) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type Folder = { name: string; path: string };

type NavState = {
  data: any[];
  folders: Folder[];
  selectedFolders: string[];
  selectedTargetFolder: string | undefined;
  deleteConfirmOpen: boolean;
  errorOpen: boolean;
  imgIdToDelete: string;
  pgIndex: number;
  selectedImgId: string;
  waiting: boolean;
  uploadOpen: boolean;

  toggleWaiting: () => void;
  setData: (imgData: any[], folders: { name: string; path: string }[]) => void;
  setId: (id: string) => void;
  setImageIdToDelete: (id: string) => void;
  setSelecedFolders: (event: SelectChangeEvent<string[]>) => void;
  setSelectedTargetFolder: (event: string) => void;
  setIndex: (imgIndex: number) => void;
  setErrorOpen: (open: boolean) => void;
  setUploadOpen: (open: boolean) => void;
  setConfirmOpen: (open: boolean) => void;
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

export default function Media() {
  // app name is derived from first pathname string
  const app =
    window.location.protocol === 'https:'
      ? window.location.pathname.replace('/', '').split('/')[0]
      : 'tngvi';

  const endpointPrefix =
    window.location.protocol === 'https:' ? '/api' : 'http://localhost:8000';

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        'image/jpeg': [],
        'image/png': [],
      },
      maxFiles: 1,
    });
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.name}>{file.name}</li>
  ));
  // Create store with Zustand
  const [useStore] = useState(() =>
    create<NavState>((set) => ({
      data: [],
      folders: [],
      errorOpen: false,
      imgIdToDelete: '',
      selectedImgId: '',
      selectedFolders: [],
      selectedTargetFolder: undefined,
      uploadOpen: false,
      deleteConfirmOpen: false,
      waiting: true,
      pgIndex: 0,
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
      setImageIdToDelete: (id: string) =>
        set((state) => {
          return {
            ...state,
            imgIdToDelete: id,
          };
        }),
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
      setIndex: (imgIndex: number) =>
        set((state) => {
          return {
            ...state,
            pgIndex: imgIndex,
          };
        }),
      setConfirmOpen: (open: boolean) =>
        set((state) => {
          return {
            ...state,
            deleteConfirmOpen: open,
          };
        }),
      setErrorOpen: (open: boolean) =>
        set((state) => {
          if (!open) toggleWaiting();

          return {
            ...state,
            errorOpen: open,
          };
        }),
      setUploadOpen: (open: boolean) =>
        set((state) => {
          return {
            ...state,
            uploadOpen: open,
          };
        }),
    }))
  );

  const {
    deleteConfirmOpen,
    errorOpen,
    imgIdToDelete,
    selectedFolders,
    selectedTargetFolder,
    folders,
    data,
    waiting,
    pgIndex,
    uploadOpen,

    toggleWaiting,
    setData,
    setConfirmOpen,
    setErrorOpen,
    setId,
    setImageIdToDelete,
    setSelecedFolders,
    setSelectedTargetFolder,
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

  const refreshMedia = () => {
    axios.get(`${endpointPrefix}/media/get/${app}/upload`).then((response) => {
      setData(response.data.imgs, response.data.folders);
      toggleWaiting();
    });
  };

  const upload = () => {
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
          formData.append('app', app);
          formData.append('folder', selectedTargetFolder as string);

          var xhr = new XMLHttpRequest();
          xhr.open('POST', `${endpointPrefix}/media/upload`, true);
          xhr.onprogress = (e) => {
            if (e.loaded !== e.total) return;
            setUploadOpen(false);
            refreshMedia();
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
      reader.readAsDataURL(acceptedFiles[0]);
    } catch (err) {
      setErrorOpen(true);
    }
  };
  const deleteImg = () => {
    try {
      axios
        .get(`${endpointPrefix}/media/delete?id=${imgIdToDelete}`)
        .then((response) => {
          if (response.data.result === 'ok') {
            setConfirmOpen(false);

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
            <div {...getRootProps({ className: 'dropzone' })}>
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
            open={deleteConfirmOpen}
            onClose={() => {
              setConfirmOpen(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This image will be permanently deleted. If it's being used
                somewhere on this app, bugs/errors may occur.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setConfirmOpen(false);
                }}
                autoFocus
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteImg();
                }}
              >
                Delete
              </Button>
            </DialogActions>
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
          <FormControl sx={{ m: 1, width: 600 }}>
            <InputLabel id="folders-chip-label">Filter by Folder</InputLabel>
            <Select
              labelId="folders-chip-label"
              id="folders-chip"
              multiple
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

          <Pagination
            count={Math.floor(filteredData.length / 30) + 1}
            page={pgIndex + 1}
            onChange={(e, pg) => {
              setIndex(pg - 1);
            }}
          />

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
                        <IconButton
                          color="warning"
                          size="large"
                          sx={actionsStyle}
                          aria-label="delete image"
                          onClick={() => {
                            setConfirmOpen(true);
                            setImageIdToDelete(d.public_id);
                          }}
                        >
                          <DeleteForeverTwoToneIcon fontSize="large" />
                        </IconButton>
                      }
                    />
                    {/* {d.public_id === currentId && (
                      <IconButton
                        color="warning"
                        size="large"
                        sx={actionsStyle}
                        aria-label="delete image"
                        onClick={() => {
                          setDeleteConfirm(true);
                          setImageIdToDelete(d.public_id);
                        }}
                      >
                        <DeleteForeverTwoToneIcon fontSize="large" />
                      </IconButton>
                    )} */}
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
