import { useEffect, useState } from 'react';
import { PageContainer } from '@keystone-6/core/admin-ui/components';

import {
  Button,
  TextField,
  Switch,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Tooltip,
  Typography,
  IconButton,
  Fab,
  Zoom,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';

import create from 'zustand';
import React from 'react';
import { string } from 'yargs';

type PageState = {
  confirmed: boolean;
  done: boolean;
  isValid: boolean;
  labelError: boolean;
  labelEntered: boolean;
  shortUrlError: boolean;
  waiting: boolean;

  data: any[];

  error: string;
  errorHelper: string;
  labelHelper: string;
  labelInput: string;
  shortUrlGenerated: string;
  shortUrlHelper: string;
  shortUrl: string;
  success: string;
  urlInput: string;
  urlError: string;
  urlFull: string;

  setData: (links: any[]) => void;

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

export default function Deploy() {
  const endpointPrefix =
    process.env.PRODUCTION_MODE === 'true' ? '/api' : 'http://localhost:8000';

  const [copied, setCopied] = React.useState(false);
  const isMac = navigator.userAgent.indexOf('Mac') !== -1;
  const shortUrlMax = 10;
  let shortUrlCount = 0;
  // Create store with Zustand
  const [useStore] = useState(() =>
    create<PageState>((set) => ({
      data: [],

      confirmed: false,
      done: false,
      isValid: false,
      labelEntered: false,
      labelError: false,
      shortUrlError: false,
      waiting: false,

      error: '',
      errorHelper: '',
      labelHelper: '',
      labelInput: '',
      shortUrlGenerated: '',
      shortUrl: '',
      shortUrlHelper: '',
      success: '',
      urlInput: '',
      urlError: '',
      urlFull: '',

      setData: (data: any[]) =>
        set((state) => {
          return { ...state, data };
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
    toggleWaiting,
    isValid,
    labelEntered,
    labelHelper,
    labelError,
    labelInput,
    urlError,
    shortUrl,
    shortUrlError,
    shortUrlHelper,
    shortUrlGenerated,
    urlFull,
    urlInput,
  } = useStore((state) => state);

  //   const confirmed = useStore((state) => state.confirmed);
  //   const waiting = useStore((state) => state.waiting);
  //   const done = useStore((state) => state.done);
  const data = useStore((state) => state.data);

  /**
   * Copy URL to clipboard
   * @function
   * @param {String} [url] - URL to copy to clipboard
   */
  const copyUrl = async (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  // // Close snackbar after 'copied' notifier
  // const snackbarClose = (event, reason) => {
  //   setCopied(false);
  // };

  // Shorten original url if too long
  const trimUrl = (url: string) => {
    return url.length > 40 ? `${url.substring(0, 40)}...` : url;
  };
  const generateLink = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    useStore.setState({
      urlError: undefined,
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

    fetch(`${process.env.REACT_APP_SERVER_URI}/generate`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        useStore.setState({
          shortUrlGenerated: data,
          shortUrl: data,
          shortUrlHelper: '(This can be customized if desired.)',
          shortUrlError: false,
          urlFull: `https://elab.works/${data}`,
        });
        shortUrlCount = data.length;
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

  useEffect(() => {
    if (data && data.length > 1) return;
    axios.get(`${endpointPrefix}/links/list`).then((response) => {
      setData(response.data);
      toggleWaiting();
    });
    // Check if all fields valid per update
    // const isValid =
    //   labelEntered &&
    //   !labelError &&
    //   !urlError &&
    //   !shortUrlError &&
    //   shortUrlGenerated !== null &&
    //   urlInput.length >= 8 &&
    //   shortUrlCount <= shortUrlMax;

    // // console.log(isValid);
    // useStore.setState({ isValid });
  });

  return (
    <PageContainer header="URL Shortener">
      <h1>URL Shortener</h1>
      <h4>Add new link</h4>

      <TableContainer component={Paper}>
        <Table size="medium" aria-label="form to add link">
          <TableBody>
            <TableRow key="Add">
              <TableCell>
                <TextField
                  id="add-label"
                  aria-label="field to input label"
                  label="Label"
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
                    startAdornment: <span id="url-prefix">elab.works/</span>,
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
                <Zoom in={isValid}>
                  <Fab
                    id="btn-add"
                    size="small"
                    color="secondary"
                    aria-label="add"
                    data-clipboard-target="#url-full"
                    onClick={(e) => {
                      e.preventDefault();
                      addLink({
                        variables: {
                          originalUrl: urlInput,
                          shortUrl,
                          label: labelInput,
                        },
                      });
                    }}
                  >
                    <AddCircleIcon />
                  </Fab>
                </Zoom>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/*  */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell>Short URL (elab.works/...)</TableCell>
              <TableCell>Original URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((link) => (
              <TableRow
                key={link._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {link.label}
                </TableCell>
                <TableCell component="th" scope="row">
                  <IconButton
                    aria-label="copy url"
                    onClick={() => {
                      copyUrl(`https://elab.works/${link.shortUrl}`);
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                  {link.shortUrl}
                </TableCell>
                <TableCell component="th" scope="row">
                  <a href={link.originalUrl} target="_blank" rel="noreferrer">
                    {trimUrl(link.originalUrl)}
                  </a>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography variant="caption" color="inherit">
                          {`Added on ${new Date(
                            link.date
                          ).toLocaleDateString()} by ${link.user || '??'}`}
                          <br />
                          <i> {`${link.clicks} clicks`}</i>
                        </Typography>
                      </React.Fragment>
                    }
                  >
                    <IconButton
                      //   aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
}
