import React, { useEffect } from 'react';
import {
  FieldContainer,
  FieldDescription,
  FieldLabel,
  TextInput,
} from '@keystone-ui/fields';
import { CellLink, CellContainer } from '@keystone-6/core/admin-ui/components';

import {
  BaseFields,
  BaseListTypeInfo,
  FieldTypeFunc,
  type CardValueComponent,
  type CellComponent,
  type FieldController,
  type FieldControllerConfig,
  type FieldProps,
} from '@keystone-6/core/types';
import _ from 'lodash';

// import { DocumentEditor } from '@keystone-6/fields-document/views';

export function Field({
  field,
  value,
  itemValue,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) {
  const neededValue =
    (itemValue as any)?.[field.dependency.field]?.value ?? null;
  const hidden =
    field.dependency.neededValue !==
    _.get(neededValue, field.dependency.queryPath);

  useEffect(() => {
    if (hidden) onChange?.('');
  }, [onChange, hidden]);

  if (hidden) return null;

  const disabled = onChange === undefined;
  return (
    <FieldContainer as="fieldset">
      <FieldLabel>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
      </FieldDescription>
      <div>
        <TextInput
          type="text"
          onChange={(event) => {
            onChange?.(event.target.value);
          }}
          disabled={disabled}
          value={value || ''}
          autoFocus={autoFocus}
        />
      </div>
    </FieldContainer>
  );
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = item[field.path] + '';
  return linkTo ? (
    <CellLink {...linkTo}>{value}</CellLink>
  ) : (
    <CellContainer>{value}</CellContainer>
  );
};
Cell.supportsLinkTo = true;

export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {item[field.path]}
    </FieldContainer>
  );
};

export const controller = (
  config: FieldControllerConfig<{
    dependency: {
      field: string;
      neededValue: any;
      queryPath: string;
    };
    // field: FieldTypeFunc<BaseListTypeInfo>
  }>
): FieldController<string | null, string> & {
  dependency: {
    field: string;
    neededValue: any;
    queryPath: string;
  };
  // fields:
  field: BaseFields<BaseListTypeInfo>;
} => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    dependency: config.fieldMeta?.dependency,
    // field: config.fieldMeta?.field,
    graphqlSelection: config.path,
    defaultValue: null,
    deserialize: (data) => {
      const value = data[config.path];
      return typeof value === 'string' ? value : null;
    },
    serialize: (value) => ({ [config.path]: value }),
  };
};
