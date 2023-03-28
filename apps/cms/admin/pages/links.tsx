import React from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@keystone-6/core/admin-ui/components';
import axios from 'axios';
import RandExp from 'randexp';

import create from 'zustand';

import {
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  IconButton,
  Fab,
  Zoom,
  Chip,
  Divider,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  TablePagination,
  Button,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

type PageState = {
  confirmed: boolean;
  copied: boolean;
  done: boolean;
  error: boolean;
  isValid: boolean;
  labelError: boolean;
  labelEntered: boolean;
  shortUrlError: boolean;
  success: boolean;
  waiting: boolean;

  data: any[];

  errorHelper: null | string;
  labelHelper: null | string;
  urlError: null | string;

  labelInput: string;
  shortUrlGenerated: string;
  shortUrlHelper: string;
  shortUrl: string;
  urlInput: string;
  urlFull: string;

  page: number;
  rowsPerPage: number;
  shortUrlCount: number;

  setData: (links: any[]) => void;
  setPage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  setRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;

  toggleConfirm: () => void;
  toggleWaiting: () => void;
};

// function Alert(props) {
//   return (
//     <MuiAlert
//       icon={<Link fontSize="inherit" />}
//       elevation={6}
//       variant="filled"
//       {...props}
//     />
//   );
// }

const styles = {
  rootUrl: {
    color: 'grey',
  },
  fab: {
    background: '#00ab9e',
  },
  flex: {
    display: 'flex',
    //  'align-items': 'center',
  },
  hidden: {
    display: 'none',
  },
};

export default function URLShortener(this: any) {
  const endpointPrefix =
    process.env.PRODUCTION_MODE === 'true' ? '/api' : 'http://localhost:8000';

  const isMac = navigator.userAgent.indexOf('Mac') !== -1;
  const shortUrlMax = 10;
  // Create store with Zustand
  const [useStore] = useState(() =>
    create<PageState>((set) => ({
      data: [],

      confirmed: false,
      copied: false,
      done: false,
      error: false,
      isValid: false,
      labelEntered: false,
      labelError: false,
      shortUrlError: false,
      success: false,
      waiting: false,

      errorHelper: '',
      labelHelper: '',
      labelInput: '',
      shortUrlGenerated: '',
      shortUrl: '',
      shortUrlHelper: '',
      urlInput: '',
      urlError: null,
      urlFull: '',

      page: 0,
      rowsPerPage: 10,
      shortUrlCount: 0,

      setData: (data: any[]) =>
        set((state) => {
          return { ...state, data };
        }),
      setPage: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        page: number
      ) =>
        set((state) => {
          return { ...state, page };
        }),
      setRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) =>
        set((state) => {
          console.log(event.target.value);
          const rowsPerPage = parseInt(event.target.value, 10);
          return { ...state, rowsPerPage };
        }),
      toggleConfirm: () =>
        set((state) => {
          return { confirmed: !state.confirmed };
        }),
      toggleWaiting: () =>
        set((state) => {
          return { waiting: !state.waiting };
        }),
    }))
  );
  const {
    setData,
    setPage,
    setRowsPerPage,
    toggleWaiting,
    copied,
    error,
    errorHelper,
    isValid,
    labelEntered,
    labelHelper,
    labelError,
    labelInput,
    page,
    urlError,
    rowsPerPage,
    shortUrl,
    shortUrlCount,
    shortUrlError,
    shortUrlHelper,
    shortUrlGenerated,
    success,
    waiting,
    urlFull,
    urlInput,
  } = useStore((state) => state);

  const data = useStore((state) => state.data);

  /**
   * Copy URL to clipboard
   * @function
   * @param {String} [url] - URL to copy to clipboard
   */
  const copyUrl = async (url: string) => {
    navigator.clipboard.writeText(url);
    useStore.setState({ copied: true });
  };

  // Close snackbar after 'copied' notifier
  const snackbarClose = () => {
    useStore.setState({
      copied: false,
      error: false,
      success: false,
    });
  };

  // Shorten original url if too long
  const trimUrl = (url: string) => {
    return url.length > 40 ? `${url.substring(0, 40)}...` : url;
  };

  const validate = () => {
    // Check if all fields valid per update
    const isValid =
      labelEntered &&
      !labelError &&
      !urlError &&
      !shortUrlError &&
      shortUrlGenerated !== null &&
      urlInput.length >= 8 &&
      shortUrlCount <= shortUrlMax;

    useStore.setState({ isValid });
  };

  const generateLink = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    useStore.setState({
      urlError: null,
      urlInput: evt.target.value,
    });

    if (evt.target.value.length < 8) {
      useStore.setState({
        urlError: 'URL too short.',
      });
      return;
    }

    if (
      !evt.target.value.match(
        new RegExp(
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
        )
      )
    ) {
      useStore.setState({
        urlError: 'Must be a valid URL.',
      });
      return;
    }

    // Generate random link in format of: 0-4 characters, mix of a-z and 0-9
    const shortUrl = new RandExp(/([a-z0-9]{4,4})/).gen().toLowerCase();
    useStore.setState({
      shortUrlGenerated: shortUrl,
      shortUrl,
      shortUrlCount: shortUrl.length,
      shortUrlHelper: '(This can be customized if desired.)',
      shortUrlError: false,
      urlFull: `https://elab.works/${data}`,
    });
  };

  const measureLabel = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    useStore.setState({
      labelInput: evt.target.value,
      labelEntered: true,
      labelHelper:
        evt.target.value.length === 0
          ? 'Required'
          : `${evt.target.value.length} / 30`,
      labelError: evt.target.value.length === 0 || evt.target.value.length > 30,
    });
  };

  const measureShortUrl = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let shortUrlCount = evt.target.value.length;
    useStore.setState({
      shortUrlCount,
      shortUrl: evt.target.value,
    });

    if (shortUrlCount === 0) {
      useStore.setState({
        shortUrlHelper: 'Required.',
        shortUrlError: true,
      });
      return;
    }

    if (!evt.target.value.match(new RegExp(/^[a-z0-9]+$/gi))) {
      useStore.setState({
        shortUrlHelper: 'Alphanumeric only.',
        shortUrlError: true,
      });
      return;
    }

    useStore.setState({
      shortUrlError: false,
      shortUrlHelper:
        shortUrlCount === 0 ? undefined : `${shortUrlCount} / ${shortUrlMax}`,
    });
  };

  const addLink = async (body: {
    originalUrl: string;
    shortUrl: string;
    label: string;
  }) => {
    toggleWaiting();

    try {
      await axios.post(`${endpointPrefix}/link/create`, body);

      axios.get(`${endpointPrefix}/links/list`).then((response) => {
        setData(response.data);
        useStore.setState({
          success: true,
          labelInput: '',
          labelHelper: '0 / 30',
          shortUrl: '',
          shortUrlHelper: '0 / 10',
          urlInput: '',
        });
      });
    } catch (err: any) {
      if (err.response.data.info.code === 11000) {
        // Dupe index errors; try keypattern
        const msg = Object.keys(err.response.data.info.key);
        let errorHelper = 'Something went wrong. :(';

        if (msg.includes('label') || msg.includes('label_1'))
          errorHelper = 'A link with this label already exists.';
        else if (msg.includes('originalUrl') || msg.includes('originalUrl_1'))
          errorHelper =
            'This link has already been shortened. Please locate it in link history.';
        else if (msg.includes('shortUrl') || msg.includes('shortUrl_1'))
          errorHelper = 'This shortened URL is already in use.';

        useStore.setState({
          error: true,
          errorHelper,
        });
      }
    }
    toggleWaiting();
  };

  useEffect(() => {
    if (data && data.length > 1) return;

    axios.get(`${endpointPrefix}/links/list`).then((response) => {
      setData(response.data);
    });
  });

  return (
    <PageContainer header="URL Shortener">
      <h1>URL Shortener</h1>
      <h4>Add new link</h4>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={waiting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper elevation={7}>
        <TableContainer onKeyUp={() => validate()}>
          <Table size="medium" aria-label="form to add link">
            <TableBody>
              <TableRow key="Add" style={styles.flex}>
                <TableCell>
                  <TextField
                    id="add-label"
                    aria-label="field to input label"
                    label="Label"
                    fullWidth={true}
                    value={labelInput}
                    error={labelError}
                    helperText={labelHelper}
                    onChange={(e) => measureLabel(e)}
                  />
                </TableCell>
                <TableCell>
                  <Tooltip
                    title={`${isMac ? '⌘' : 'Ctrl'} - V`}
                    arrow
                    disableHoverListener
                    disableTouchListener
                  >
                    <TextField
                      id="add-url"
                      label="URL"
                      value={urlInput}
                      error={urlError !== null}
                      helperText={urlError}
                      onChange={(e) => generateLink(e)}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <TextField
                    id="short-url"
                    label="Short URL"
                    value={shortUrl}
                    placeholder={shortUrlGenerated}
                    error={shortUrlCount > shortUrlMax || shortUrlError}
                    helperText={shortUrlHelper}
                    onChange={(e) => measureShortUrl(e)}
                    InputProps={{
                      startAdornment: (
                        <span id="url-prefix" style={styles.rootUrl}>
                          elab.works/
                        </span>
                      ),
                      endAdornment: (
                        <input
                          id="url-full"
                          readOnly={true}
                          style={{ display: 'none' }}
                          value={urlFull}
                        />
                      ),
                    }}
                  />
                </TableCell>

                <TableCell>
                  {' '}
                  <Zoom in={isValid}>
                    <Fab
                      id="btn-add"
                      size="large"
                      color="success"
                      aria-label="add"
                      data-clipboard-target="#url-full"
                      style={{ marginTop: '1rem' }}
                      onClick={(e) => {
                        e.preventDefault();
                        addLink({
                          originalUrl: urlInput,
                          shortUrl,
                          label: labelInput,
                        });
                      }}
                    >
                      <AddCircleOutlineOutlinedIcon sx={{ fontSize: 50 }} />
                    </Fab>
                  </Zoom>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Snackbar open={copied} autoHideDuration={1000} onClose={snackbarClose}>
          <Alert severity="success">Copied</Alert>
        </Snackbar>
        <Snackbar open={error} autoHideDuration={3000} onClose={snackbarClose}>
          <Alert severity="error">{errorHelper}</Alert>
        </Snackbar>
        <Snackbar
          open={success}
          autoHideDuration={4500}
          onClose={snackbarClose}
        >
          <Alert severity="success">Link added!</Alert>
        </Snackbar>
      </Paper>
      <Divider style={{ marginTop: '2rem' }}>
        <Chip label="Link History" />
      </Divider>
      {data && (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Label</TableCell>
                  <TableCell>Short URL (elab.works/...)</TableCell>
                  <TableCell>Original URL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((link) => (
                    <TableRow
                      key={link._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {link.label}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button
                          disableElevation
                          size="small"
                          aria-label="copy url"
                          onClick={() => {
                            copyUrl(`https://elab.works/${link.shortUrl}`);
                          }}
                          startIcon={<ContentCopyIcon />}
                        >
                          {link.shortUrl}
                        </Button>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <a
                          href={link.originalUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {trimUrl(link.originalUrl)}
                        </a>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Tooltip
                          title={
                            <>
                              <Typography variant="caption" color="inherit">
                                {`Added on ${new Date(
                                  link.date
                                ).toLocaleDateString()} by ${
                                  link.user || '??'
                                }`}
                                <br />
                                <i> {`${link.clicks} clicks`}</i>
                              </Typography>
                            </>
                          }
                        >
                          <IconButton aria-haspopup="true">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </>
      )}
    </PageContainer>
  );
}
