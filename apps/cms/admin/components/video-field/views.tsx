import React from 'react';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import { CellLink, CellContainer } from '@keystone-6/core/admin-ui/components';
import { Button } from '@keystone-ui/button';

import {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from '@keystone-6/core/types';

import { css as emCss } from '@emotion/css';

const styles = {
  icon: emCss`
      display: inline-block;
      margin-right: 1rem;`,
  field: emCss`
      display: flex;
      align-items: center;
      background-color: #F6A5365E;
      padding: .5rem;
    `,
};

export function Field({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) {
  return (
    <FieldContainer as="fieldset" className={styles.field}>
      <Button
        size="small"
        disabled={onChange === undefined}
        onClick={() => {
          //   inputRef.current?.click();
        }}
        tone="positive"
      >
        Select Video
      </Button>
    </FieldContainer>
  );
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path] + '';
  return <CellContainer>{value}</CellContainer>;
};

export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {/* {item[field.path]} */}
    </FieldContainer>
  );
};

export const controller = (
  config: FieldControllerConfig
): FieldController<string | null, string> => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,

    graphqlSelection: `${config.path} {
        url
        filename
        ref
        filesize
      }`,
    defaultValue: { kind: 'empty' },
    deserialize: (data) => {
      const value = data[config.path];
      return typeof value === 'string' ? value : null;
    },
    serialize: (value) => ({ [config.path]: value }),
  };
};
