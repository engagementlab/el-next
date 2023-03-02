import { useState } from 'react';
import { PageContainer } from '@keystone-6/core/admin-ui/components';

import { Button, TextField, Switch } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import axios from 'axios';

import create from 'zustand';
import React from 'react';

type PageState = {
  confirmed: boolean;
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
  // Create store with Zustand
  const [useStore] = useState(() =>
    create<PageState>((set) => ({
      confirmed: false,
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
  const confirmed = useStore((state) => state.confirmed);
  const waiting = useStore((state) => state.waiting);
  const done = useStore((state) => state.done);
  const actionsLink = useStore((state) => state.actionsLink);
  const noteContent = useStore((state) => state.noteContent);
  const noteCount = useStore((state) => state.noteCount);

  const deployFetch = async () => {
    toggleWaiting();
    const response = await axios.get(
      `/api/prod-deploy/app=${process.env.APP_NAME}&?note=${noteContent}`,
      {
        withCredentials: true,
      }
    );
    setActionsLink(
      `https://github.com/engagementlab/${response.data.repo}/actions/runs/${response.data.id}?check_suite_focus=true`
    );
    toggleDone();
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
          <p style={{ color: 'grey' }}>
            Looking to deploy <em>Engagement Lab Home</em>? Please go{' '}
            <a href="https://api.elab.emerson.edu/cms/engagement-lab-home/deploy">
              here
            </a>
            .
          </p>
          <hr style={{ borderWidth: '1px', width: '20%' }} />
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
        </>
      )}
    </PageContainer>
  );
}
