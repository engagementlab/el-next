import { useState } from 'react';
import { PageContainer } from '@keystone-6/core/admin-ui/components';

import { Button, TextField, Switch, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import axios from 'axios';

import { create } from 'zustand';

import React from 'react';
import appConfigMap from '../../appConfig';

type PageState = {
  confirmed: boolean;
  dataError: boolean;
  waiting: boolean;
  done: boolean;
  actionsLink: string;
  noteContent: null | string;
  noteCount: number;
  toggleConfirm: () => void;
  toggleWaiting: () => void;
  toggleDone: () => void;
  setActionsLink: (link: string) => void;
  setNote: (content: string) => void;
};
export default function Deploy() {
  const endpointPrefix =
    window.location.protocol === 'https:' ? '/api' : 'http://localhost:8000';

  // Create store with Zustand
  const [useStore] = useState(() =>
    create<PageState>((set) => ({
      confirmed: false,
      dataError: false,
      waiting: false,
      done: false,
      actionsLink: '',
      noteContent: null,
      noteCount: 0,
      toggleConfirm: () =>
        set((state) => {
          return { confirmed: !state.confirmed };
        }),
      toggleWaiting: () =>
        set((state) => {
          return { waiting: !state.waiting };
        }),
      toggleDone: () =>
        set((state) => {
          return { done: !state.done };
        }),
      setActionsLink: (link: string) =>
        set((state) => {
          return {
            ...state,
            actionsLink: link,
          };
        }),
      setNote: (content: string) =>
        set((state) => {
          return {
            ...state,
            noteContent: content,
            noteCount: content.length,
          };
        }),
    }))
  );
  const toggleConfirm = useStore((state) => state.toggleConfirm);
  const toggleWaiting = useStore((state) => state.toggleWaiting);
  const toggleDone = useStore((state) => state.toggleDone);
  const setActionsLink = useStore((state) => state.setActionsLink);
  const setNote = useStore((state) => state.setNote);

  const {
    confirmed,
    dataError,
    waiting,
    done,
    actionsLink,
    noteContent,
    noteCount,
  } = useStore((state) => state);
  const deployFetch = async () => {
    toggleWaiting();
    // app name is derived from first pathname string
    const app =
      window.location.protocol === 'https:'
        ? window.location.pathname.replace('/', '').split('/')[0]
        : 'sjm';
    try {
      const response = await axios.post(
        `${endpointPrefix}/prod-deploy`,
        {
          app,
          storageAccount: appConfigMap[app].storageAccount,
          cdnName:
            appConfigMap[app].cdnName || appConfigMap[app].storageAccount,
          apexUrl: appConfigMap[app].apexUrl,
          note: noteContent,
        },
        {
          withCredentials: true,
        }
      );
      setActionsLink(
        `https://github.com/engagementlab/${response.data.repo}/actions/runs/${response.data.id}?check_suite_focus=true`
      );
      toggleDone();
    } catch (err) {
      useStore.setState({
        dataError: true,
      });
      toggleConfirm();
      toggleWaiting();
    }
  };

  return (
    <PageContainer header="Deploy to Production">
      <h1>Deployment Center</h1>

      {done ? (
        <p>
          The build to production is now being deployed via Github. This can
          take up to 10 minutes. We are not able to monitor the progress of this
          here but you can view progress <a href={actionsLink}>here</a>. The
          status will also show up in{' '}
          <a href="https://engagelab.slack.com/archives/C03G64ZUNTY">#builds</a>
          .
        </p>
      ) : (
        <>
          <p>
            This action will copy the content from the current QA build to
            production.
          </p>
          <p>
            Before doing this, please ensure the QA build is free of all content
            issues and any bugs that may be caused by missing or poor-quality
            content (e.g. images). This action is not easily reversible, and all
            content from QA will generally be immediately viewable by all users.
          </p>
          <Switch
            defaultChecked={false}
            value={confirmed}
            onClick={() => {
              toggleConfirm();
            }}
          />{' '}
          I Understand
          <br />
          {confirmed && !waiting && (
            <>
              <hr style={{ borderWidth: '.1px', borderColor: '#f6a536' }} />
              <p>
                An optional short description is published to&nbsp;
                <a href="https://engagelab.slack.com/archives/C03G64ZUNTY">
                  #builds
                </a>{' '}
                and is retained in the deployment history.
                <br />
                It can also help to identify the cause of an issue, should one
                occur.
              </p>
              <div style={{ maxWidth: '450px' }}>
                <TextField
                  id="build-description"
                  label="Short Summary (optional)"
                  variant="outlined"
                  multiline
                  rows={2}
                  maxRows={4}
                  helperText={`${noteCount}/120`}
                  onChange={(e) => setNote(e.target.value)}
                  inputProps={{ maxLength: 120 }}
                  fullWidth={true}
                />
                <br />
                <br />
              </div>
              <Button
                variant="outlined"
                onClick={() => {
                  deployFetch();
                }}
              >
                Deploy
              </Button>
            </>
          )}
          {waiting && (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
            >
              Deploy
            </LoadingButton>
          )}
          {dataError && (
            <Alert severity="error">
              Something went wrong. Please refresh this page and try again.
            </Alert>
          )}
        </>
      )}
    </PageContainer>
  );
}
