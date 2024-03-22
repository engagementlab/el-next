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

export interface Button {
  label: string;
  url: string;
  icon: string;
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
const VRIcon = () => {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20">
      <image
        width="20"
        height="20"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDctMTRUMTQ6MzM6NTMtMDQ6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA3LTE0VDE0OjM1OjE1LTA0OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA3LTE0VDE0OjM1OjE1LTA0OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiNjRkZDE1My1lODI1LTQ1NWQtOGQxNC1kMWQ2ZGE1NDBiZGIiIHhtcE1NOkRvY3VtZW50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AICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICBBAAAGEgAAICB/j8FhT/hqz17HwAAAABJRU5ErkJggg=="
      ></image>
    </svg>
  );
};
export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => {
  const [labelValue, setLabelValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [icon, setIcon] = useState('');
  const [index, setIndex] = useState<number | null>(null);

  const relatedTools: Button[] = value ? JSON.parse(value) : [];
  const onSubmitNewButton = () => {
    if (onChange) {
      const relatedToolsCopy = [
        ...relatedTools,
        { label: labelValue, url: urlValue, icon },
      ];
      onChange(JSON.stringify(relatedToolsCopy));
      onCancelButton();
    }
  };

  const onDeleteButton = (index: number) => {
    if (onChange) {
      const relatedToolsCopy = [...relatedTools];
      relatedToolsCopy.splice(index, 1);
      onChange(JSON.stringify(relatedToolsCopy));
      onCancelButton();
    }
  };

  const onEditButton = (index: number) => {
    if (onChange) {
      setIndex(index);
      setLabelValue(relatedTools[index].label);
      setUrlValue(relatedTools[index].url);
      setIcon(relatedTools[index].icon);
    }
  };

  const onUpdateButton = () => {
    if (onChange && index !== null) {
      const relatedToolsCopy = [...relatedTools];
      relatedToolsCopy[index] = {
        label: labelValue,
        url: urlValue,
        icon,
      };
      onChange(JSON.stringify(relatedToolsCopy));
      onCancelButton();
    }
  };

  const onCancelButton = () => {
    setIndex(null);
    setLabelValue('');
    setUrlValue('');

    setIcon('');
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

              <FormControl style={{ minWidth: '100px', marginLeft: '.5rem' }}>
                <InputLabel id="type-select-label">Icon</InputLabel>
                <Select
                  value={icon}
                  label="Type"
                  onChange={(event) => setIcon(event.target.value)}
                >
                  <MenuItem value="website">
                    <svg height="20" viewBox="0 -960 960 960" width="20">
                      <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h279v60H180v600h600v-279h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60v-218L382-339Z" />
                    </svg>
                  </MenuItem>
                  <MenuItem value="app">
                    <svg height="20" viewBox="0 -960 960 960" width="20">
                      <path d="M480-313 287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z" />
                    </svg>
                  </MenuItem>
                  <MenuItem value="video">
                    <svg height="20" width="20" viewBox="0 -960 960 960">
                      <path d="m392-313 260-169-260-169v338ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z" />
                    </svg>
                  </MenuItem>
                  <MenuItem value="vr">
                    <VRIcon />
                  </MenuItem>

                  <MenuItem value="arrow">➝</MenuItem>
                  <MenuItem value="book">
                    <svg height="20" width="20" viewBox="0 -960 960 960">
                      <path d="M290-80q-53.857 0-91.929-38.071Q160-156.143 160-210v-540q0-53.857 38.071-91.929Q236.143-880 290-880h510v600q-26 0-43 21t-17 49q0 28 17 49t43 21v60H290Zm-70-240q15-10 32.5-15t37.5-5h30v-480h-30q-29.167 0-49.583 20.417Q220-779.167 220-750v430Zm160-20h360v-480H380v480Zm-160 20v-500 500Zm69.541 180H699q-9-15-14-33t-5-37q0-20 5-37.5t15-32.5H289.607Q261-280 240.5-259.583 220-239.167 220-210q0 29 20.5 49.5t49.041 20.5Z" />
                    </svg>
                  </MenuItem>
                  <MenuItem value="article">
                    <svg height="20" width="20" viewBox="0 -960 960 960">
                      <path d="M140-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h680q24 0 42 18t18 42v600q0 24-18 42t-42 18H140Zm0-60h680v-600H140v600Zm109-106h462v-60H249v60Zm0-166h155v-222H249v222Zm259 0h203v-60H508v60Zm0-162h203v-60H508v60ZM140-180v-600 600Z" />
                    </svg>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          {index !== null ? (
            <Fragment>
              <Button onClick={onUpdateButton} className={styles.form.button}>
                Update
              </Button>
              <Button onClick={onCancelButton} className={styles.form.button}>
                Cancel
              </Button>
            </Fragment>
          ) : (
            <Button onClick={onSubmitNewButton} className={styles.form.button}>
              Add
            </Button>
          )}
        </Fragment>
      )}
      <ul className={styles.list.ul}>
        {relatedTools.map((relatedTool: Button, i: number) => {
          return (
            <li key={`related-link-${i}`} className={styles.list.li}>
              <div className={styles.list.data}>
                <div className={styles.list.dataLabel}>{relatedTool.label}</div>
                <div className={styles.list.dataHref}>
                  <Link href={relatedTool.url} target="_blank">
                    {relatedTool.url.substring(0, 30)}...
                  </Link>
                </div>
                <div className={styles.list.dataLabel}>
                  {relatedTool.icon === 'website' && (
                    <svg height="20" viewBox="0 -960 960 960" width="20">
                      <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h279v60H180v600h600v-279h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60v-218L382-339Z" />
                    </svg>
                  )}
                  {relatedTool.icon === 'app' && (
                    <svg height="20" viewBox="0 -960 960 960" width="20">
                      <path d="M480-313 287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z" />
                    </svg>
                  )}
                  {relatedTool.icon === 'video' && (
                    <svg height="20" width="20" viewBox="0 -960 960 960">
                      <path d="m392-313 260-169-260-169v338ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z" />
                    </svg>
                  )}
                  {relatedTool.icon === 'vr' && <VRIcon />}
                  {relatedTool.icon === 'arrow' && <>➝</>}
                  {relatedTool.icon === 'book' && (
                    <svg height="20" width="20" viewBox="0 -960 960 960">
                      <path d="M290-80q-53.857 0-91.929-38.071Q160-156.143 160-210v-540q0-53.857 38.071-91.929Q236.143-880 290-880h510v600q-26 0-43 21t-17 49q0 28 17 49t43 21v60H290Zm-70-240q15-10 32.5-15t37.5-5h30v-480h-30q-29.167 0-49.583 20.417Q220-779.167 220-750v430Zm160-20h360v-480H380v480Zm-160 20v-500 500Zm69.541 180H699q-9-15-14-33t-5-37q0-20 5-37.5t15-32.5H289.607Q261-280 240.5-259.583 220-239.167 220-210q0 29 20.5 49.5t49.041 20.5Z" />
                    </svg>
                  )}
                  {relatedTool.icon === 'article' && (
                    <svg height="20" width="20" viewBox="0 -960 960 960">
                      <path d="M140-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h680q24 0 42 18t18 42v600q0 24-18 42t-42 18H140Zm0-60h680v-600H140v600Zm109-106h462v-60H249v60Zm0-166h155v-222H249v222Zm259 0h203v-60H508v60Zm0-162h203v-60H508v60ZM140-180v-600 600Z" />
                    </svg>
                  )}
                </div>
              </div>
              {onChange && (
                <div>
                  <Button
                    size="small"
                    onClick={() => onEditButton(i)}
                    className={styles.list.optionButton}
                  >
                    <EditIcon size="small" color="blue" />
                  </Button>
                  <Button size="small" className={styles.list.optionButton}>
                    <MinusCircleIcon
                      size="small"
                      color="red"
                      onClick={() => onDeleteButton(i)}
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
