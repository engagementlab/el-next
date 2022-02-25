
/** @jsxRuntime classic */
/** @jsx jsx */
import { Fragment, useState } from 'react';
import { jsx, Stack } from '@keystone-ui/core';
import { FieldContainer, FieldLabel, MultiSelect, Select } from '@keystone-ui/fields';
import { Text } from '@keystone-ui/core';
import { CellLink, CellContainer } from '@keystone-6/core/admin-ui/components';
import { CardValueComponent, CellComponent, FieldController, FieldControllerConfig, FieldProps } from '@keystone-6/core/types';

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  forceValidation,
}: FieldProps<typeof controller>) => {
  const [hasChanged, setHasChanged] = useState(false);
  const validationMessage =
    (hasChanged || forceValidation) && !validate(value, field.isRequired) ? (
      <Text color="red600" size="small">
        {field.label} is required
      </Text>
    ) : null;
    // let Vimeo = require('vimeo').Vimeo;
    // let client = new Vimeo("e08b340ffc839123f095840317ae7a3d9f8723df", "FqqYM+dZDb+goPytM14N/aEu2gZdrMWIuC26tQL/9Bvuqzm6RtwzWURB9ovcx1xiKFHAe4Yrx/cFztagtfk5UBywbqbVon+aB/EayQtC5+QIY1XDxJRWfFIkCCLqeCqW", "3647f53d834861733e0e0a93de7a4595");

    // client.request({
    //   method: 'GET',
    //   path: '/tutorial'
    // }, function (error, body, status_code, headers) {
    //   if (error) {
    //     console.log(error);
    //   }

    //   console.log(body);
    // })
  return (
    <FieldContainer as={'div'}>
    
        <Fragment>
          <FieldLabel htmlFor={field.path}>{field.label}</FieldLabel>
          <Select
            id={field.path}
            isClearable
            autoFocus={autoFocus}
            options={field.options}
            isDisabled={onChange === undefined}
            onChange={newVal => {
              onChange?.({ ...value, value: newVal });
              setHasChanged(true);
            }}
            value={value.value}
            portalMenu
          />
          {validationMessage}
        </Fragment>
    </FieldContainer>
  );
};

export const Cell: CellComponent<typeof controller> = ({ item, field, linkTo }) => {
  let value = item[field.path] + '';
  const label = field.options.find(x => x.value === value)?.label;
  return linkTo ? <CellLink {...linkTo}>{label}</CellLink> : <CellContainer>{label}</CellContainer>;
};
Cell.supportsLinkTo = true;

export const CardValue: CardValueComponent<typeof controller> = ({ item, field }) => {
  let value = item[field.path] + '';
  const label = field.options.find(x => x.value === value)?.label;

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {label}
    </FieldContainer>
  );
};

export type AdminSelectFieldMeta = {
    options: readonly { label: string; value: string | number }[];
    type: 'string' | 'integer' | 'enum';
    isRequired: boolean;
    defaultValue: string | number | null;
  };

  type Config = FieldControllerConfig<AdminSelectFieldMeta>;

  type Option = { label: string; value: string };
  
  type Value =
    | { value: Option | null; kind: 'create' }
    | { value: Option | null; initial: Option | null; kind: 'update' };
  
  function validate(value: Value, isRequired: boolean) {
    if (isRequired) {
      // if you got null initially on the update screen, we want to allow saving
      // since the user probably doesn't have read access control
      if (value.kind === 'update' && value.initial === null) {
        return true;
      }
      return value.value !== null;
    }
    return true;
  }
  export const controller = (
    config: Config
  ): FieldController<Value, Option[]> & {
    options: Option[];
    type: 'string' | 'integer' | 'enum';
    isRequired: boolean;
  } => {
    const optionsWithStringValues = config.fieldMeta.options.map(x => ({
      label: x.label,
      value: x.value.toString(),
    }));
  
    // Transform from string value to type appropriate value
    const t = (v: string | null) =>
      v === null ? null : config.fieldMeta.type === 'integer' ? parseInt(v) : v;
  
    const stringifiedDefault = config.fieldMeta.defaultValue?.toString();
  
    return {
      path: config.path,
      label: config.label,
      graphqlSelection: config.path,
      defaultValue: {
        kind: 'create',
        value: optionsWithStringValues.find(x => x.value === stringifiedDefault) ?? null,
      },
      type: config.fieldMeta.type,
      isRequired: config.fieldMeta.isRequired,
      options: optionsWithStringValues,
      deserialize: data => {
        for (const option of config.fieldMeta.options) {
          if (option.value === data[config.path]) {
            const stringifiedOption = { label: option.label, value: option.value.toString() };
            return {
              kind: 'update',
              initial: stringifiedOption,
              value: stringifiedOption,
            };
          }
        }
        return { kind: 'update', initial: null, value: null };
      },
      serialize: value => ({ [config.path]: t(value.value?.value ?? null) }),
      validate: value => validate(value, config.fieldMeta.isRequired),
      filter: {
        Filter(props) {
          return (
            <MultiSelect
              onChange={props.onChange}
              options={optionsWithStringValues}
              value={props.value}
              autoFocus
            />
          );
        },
        graphql: ({ type, value: options }) => ({
          [config.path]: { [type === 'not_matches' ? 'notIn' : 'in']: options.map(x => t(x.value)) },
        }),
        Label({ type, value }) {
          if (!value.length) {
            return type === 'not_matches' ? `is set` : `has no value`;
          }
          if (value.length > 1) {
            const values = value.map(i => i.label).join(', ');
            return type === 'not_matches' ? `is not in [${values}]` : `is in [${values}]`;
          }
          const optionLabel = value[0].label;
          return type === 'not_matches' ? `is not ${optionLabel}` : `is ${optionLabel}`;
        },
        types: {
          matches: {
            label: 'Matches',
            initialValue: [],
          },
          not_matches: {
            label: 'Does not match',
            initialValue: [],
          },
        },
      },
    };
  };