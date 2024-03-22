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

const Partners = [
  { key: 'ldbpi', name: 'Louis D. Brown Peace Institute' },
  {
    key: 'mgh',
    name: 'Massachusetts General Hospital Gun Violence Prevention Center',
  },
  {
    key: 'magv',
    name: 'Massachusetts Coalition to Prevent Gun Violence',
  },
  { key: 'teenempowerment', name: 'Teen Empowerment' },
  { key: 'uncornered', name: 'Boston Uncornered' },
  { key: 'ficdc', name: 'Fairmount Indigo CDC Collaborative' },
  { key: 'greenroots', name: 'GreenRoots' },
  { key: 'sftt', name: 'Speak for the Trees' },
  { key: 'zoone', name: 'Zoo New England' },
  { key: 'wabt', name: 'We Are Better Together' },
];
interface Button {
  name: string;
  description: string;
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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [index, setIndex] = useState<number | null>(null);

  const partners: Button[] = value ? JSON.parse(value) : [];
  const onSubmitNewButton = () => {
    if (onChange) {
      const partnersCopy = [...partners, { description, name }];
      onChange(JSON.stringify(partnersCopy));
      onCancelButton();
    }
  };

  const onDeleteButton = (index: number) => {
    if (onChange) {
      const partnersCopy = [...partners];
      partnersCopy.splice(index, 1);
      onChange(JSON.stringify(partnersCopy));
      onCancelButton();
    }
  };

  const onEditButton = (index: number) => {
    if (onChange) {
      setIndex(index);
      setName(partners[index].name);
      setDescription(partners[index].description);
    }
  };

  const onUpdateButton = () => {
    if (onChange && index !== null) {
      const partnersCopy = [...partners];
      partnersCopy[index] = {
        description,
        name,
      };
      onChange(JSON.stringify(partnersCopy));
      onCancelButton();
    }
  };

  const onCancelButton = () => {
    setIndex(null);
    setDescription('');

    setName('');
  };

  return (
    <FieldContainer>
      <>
        <hr style={{ height: '3px', width: '100%', background: '#FF0001' }} />
      </>
      <FieldLabel>{field.label}</FieldLabel>
      {onChange && (
        <Fragment>
          <div style={{ backgroundColor: '#eff3f6', padding: '1rem' }}>
            <div className={styles.form.field}>
              <FormControl style={{ minWidth: '100px', marginLeft: '.5rem' }}>
                <InputLabel id="type-select-label">Partner</InputLabel>
                <Select
                  value={name}
                  label="Type"
                  onChange={(event) => setName(event.target.value)}
                >
                  {Partners.map((partner) => {
                    return (
                      <MenuItem value={partner.key}>{partner.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                label="Description"
                variant="outlined"
                onChange={(event) => setDescription(event.target.value)}
                multiline={true}
                minRows={3}
                value={description}
                style={{ minWidth: '500px', marginLeft: '.5rem' }}
              />
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
        {partners.map((partner: Button, i: number) => {
          return (
            <li key={`related-link-${i}`} className={styles.list.li}>
              <div className={styles.list.data}>
                <div className={styles.list.dataLabel}>
                  {Partners.find((value) => value.key === partner.name)?.name}
                </div>
                <div className={styles.list.dataHref}>
                  {partner.description.substring(0, 30) + '...'}
                </div>
                <div className={styles.list.dataLabel}></div>
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
