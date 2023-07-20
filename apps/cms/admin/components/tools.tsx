/** @jsxImportSource @emotion/react */
/* eslint-disable @next/next/no-img-element */
import { FieldProps } from '@keystone-6/core/types';
import { Button } from '@keystone-ui/button';
import { controller } from '@keystone-6/core/fields/types/json/views';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import { MinusCircleIcon, EditIcon } from '@keystone-ui/icons';
import { Fragment, useState } from 'react';

import { css } from '@emotion/css';
import {
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

export interface RelatedTool {
  label: string;
  url: string;
  description: string;
  type: string;
}
const styles = {
  form: {
    field: css`
      width: 100%;
      margin: 1rem 0 0 0;
    `,
    label: css`
      width: 10%;
    `,
    input: css`
      width: 90%;
    `,
    button: css`
      margin: 1rem 0.5rem 0 0;
    `,
  },
  list: {
    ul: css`
      list-style: none;
      margin: 1rem 0 0 0;
      padding: 0;
    `,
    li: css`
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      width: 100%;

      &:nth-of-type(2n) > div:nth-of-type(1) {
        background-color: white;
      }
    `,
    data: css`
      background-color: #eff3f6;
      padding: 0.5rem;
      flex: auto;
      display: flex;
      align-items: flex-start;
      flex-wrap: nowrap;
    `,
    dataLabel: css`
      width: 40%;
    `,
    dataHref: css`
      width: 60%;
    `,
    optionButton: css`
      margin: 0 0 0 0.5rem;
    `,
  },
};
export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => {
  const [labelValue, setLabelValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [index, setIndex] = useState<number | null>(null);

  const relatedTools: RelatedTool[] = value ? JSON.parse(value) : [];
  const onSubmitNewRelatedTool = () => {
    if (onChange) {
      const relatedToolsCopy = [
        ...relatedTools,
        { label: labelValue, url: urlValue, description, type },
      ];
      onChange(JSON.stringify(relatedToolsCopy));
      onCancelRelatedTool();
    }
  };

  const onDeleteRelatedTool = (index: number) => {
    if (onChange) {
      const relatedToolsCopy = [...relatedTools];
      relatedToolsCopy.splice(index, 1);
      onChange(JSON.stringify(relatedToolsCopy));
      onCancelRelatedTool();
    }
  };

  const onEditRelatedTool = (index: number) => {
    if (onChange) {
      setIndex(index);
      setLabelValue(relatedTools[index].label);
      setUrlValue(relatedTools[index].url);
      setDescription(relatedTools[index].description);
      setType(relatedTools[index].type);
    }
  };

  const onUpdateRelatedTool = () => {
    if (onChange && index !== null) {
      const relatedToolsCopy = [...relatedTools];
      relatedToolsCopy[index] = {
        label: labelValue,
        url: urlValue,
        description,
        type,
      };
      onChange(JSON.stringify(relatedToolsCopy));
      onCancelRelatedTool();
    }
  };

  const onCancelRelatedTool = () => {
    setIndex(null);
    setLabelValue('');
    setUrlValue('');
    setDescription('');
    setType('');
  };

  return (
    <FieldContainer>
      <>
        <hr style={{ height: '3px', width: '100%', background: '#5EB89E' }} />
      </>
      <FieldLabel>{field.label}</FieldLabel>
      {onChange && (
        <Fragment>
          <div style={{ backgroundColor: '#eff3f6', padding: '1rem' }}>
            <div className={styles.form.field}>
              <TextField
                label="Label/Name"
                variant="outlined"
                onChange={(event) => setLabelValue(event.target.value)}
                value={labelValue}
              />

              <TextField
                label="URL"
                variant="outlined"
                onChange={(event) => setUrlValue(event.target.value)}
                value={urlValue}
                style={{ marginLeft: '.5rem' }}
              />
            </div>
            <div className={styles.form.field}>
              <TextField
                label="Description"
                multiline
                maxRows={3}
                rows={3}
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />

              <FormControl style={{ minWidth: '100px', marginLeft: '.5rem' }}>
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  value={type}
                  label="Type"
                  onChange={(event) => setType(event.target.value)}
                >
                  <MenuItem value="url">Website</MenuItem>
                  <MenuItem value="file">Download</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          {index !== null ? (
            <Fragment>
              <Button
                onClick={onUpdateRelatedTool}
                className={styles.form.button}
              >
                Update
              </Button>
              <Button
                onClick={onCancelRelatedTool}
                className={styles.form.button}
              >
                Cancel
              </Button>
            </Fragment>
          ) : (
            <Button
              onClick={onSubmitNewRelatedTool}
              className={styles.form.button}
            >
              Add
            </Button>
          )}
        </Fragment>
      )}
      <ul className={styles.list.ul}>
        {relatedTools.map((relatedTool: RelatedTool, i: number) => {
          return (
            <li key={`related-link-${i}`} className={styles.list.li}>
              <div className={styles.list.data}>
                <div className={styles.list.dataLabel}>{relatedTool.label}</div>
                <div className={styles.list.dataHref}>
                  <Link href={relatedTool.url} target="_blank">
                    {relatedTool.url}
                  </Link>
                </div>
                <div className={styles.list.dataLabel}>
                  {relatedTool.description.slice(0, 10) + '...'}
                </div>
                <div className={styles.list.dataLabel}>
                  {relatedTool.type === 'url' && (
                    <svg height="20" viewBox="0 -960 960 960" width="20">
                      <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h279v60H180v600h600v-279h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60v-218L382-339Z" />
                    </svg>
                  )}
                  {relatedTool.type === 'file' && (
                    <svg height="20" viewBox="0 -960 960 960" width="20">
                      <path d="M480-313 287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z" />
                    </svg>
                  )}
                </div>
              </div>
              {onChange && (
                <div>
                  <Button
                    size="small"
                    onClick={() => onEditRelatedTool(i)}
                    className={styles.list.optionButton}
                  >
                    <EditIcon size="small" color="blue" />
                  </Button>
                  <Button size="small" className={styles.list.optionButton}>
                    <MinusCircleIcon
                      size="small"
                      color="red"
                      onClick={() => onDeleteRelatedTool(i)}
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
