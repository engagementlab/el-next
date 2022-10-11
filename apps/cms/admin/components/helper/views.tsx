import React from 'react';
import { FieldContainer, FieldDescription, FieldLabel, TextInput } from '@keystone-ui/fields';
import { CellLink, CellContainer } from '@keystone-6/core/admin-ui/components';

import {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from '@keystone-6/core/types';

import {
  css as emCss
} from '@emotion/css';

const styles = {
  icon: emCss  `
      display: inline-block;
      transform: scale(0.1);`,
  field: emCss `
      background-color: #F7F7F7;
      padding: 1rem;
    `,
};

export function Field({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) {
  const disabled = onChange === undefined;

  return (
    <FieldContainer as="fieldset" className={styles.field}>
      <svg version="1.1" id="Layer_1" x="0px" y="0px"
	 viewBox="0 0 67 67" className={styles.icon}>
      <g>
        <path style={{fill:'#FECA09'}} d="M435.199,255.997c0,98.97-80.23,179.2-179.2,179.2s-179.2-80.23-179.2-179.2
          s80.23-179.2,179.2-179.2S435.199,157.028,435.199,255.997"/>
        <g>
          <path style={{fill:'#FC5923'}} d="M81.015,439.514c-2.185,0-4.369-0.836-6.033-2.5C26.624,388.664,0,324.374,0,255.997
            S26.624,123.329,74.982,74.979c3.337-3.328,8.73-3.328,12.066,0c3.337,3.337,3.337,8.738,0,12.066
            c-45.133,45.133-69.982,105.131-69.982,168.951s24.849,123.819,69.982,168.951c3.337,3.337,3.337,8.73,0,12.066
            C85.385,438.678,83.2,439.514,81.015,439.514"/>
          <path style={{fill:'#FC5923'}} d="M430.982,439.514c-2.185,0-4.369-0.836-6.033-2.5c-3.337-3.337-3.337-8.73,0-12.066
            c45.133-45.133,69.982-105.131,69.982-168.951s-24.849-123.819-69.982-168.951c-3.337-3.328-3.337-8.73,0-12.066
            c3.337-3.328,8.73-3.328,12.066,0c48.358,48.35,74.982,112.64,74.982,181.018s-26.624,132.668-74.982,181.018
            C435.351,438.678,433.167,439.514,430.982,439.514"/>
        </g>
        <g>
          <path style={{fill:'#FFFFFF'}} d="M255.999,298.664L255.999,298.664c-9.429,0-17.067-7.637-17.067-17.067V136.531
            c0-9.429,7.637-17.067,17.067-17.067s17.067,7.637,17.067,17.067v145.067C273.066,291.027,265.428,298.664,255.999,298.664"/>
          <path style={{fill:'#FFFFFF'}} d="M281.599,366.931c0,14.14-11.46,25.6-25.6,25.6c-14.14,0-25.6-11.46-25.6-25.6
            s11.46-25.6,25.6-25.6C270.139,341.331,281.599,352.791,281.599,366.931"/>
        </g>
      </g>
      </svg>

      <div dangerouslySetInnerHTML={{__html: field.html}} />
      {/* <div>
        <TextInput
          type="text"
          onChange={event => {
            onChange?.(event.target.value);
          }}
          disabled={disabled}
          value={value || ''}
          autoFocus={autoFocus}
        />
        <a href="https://docs.google.com/document/d/19eTH_wqDlXfsP8ODPz7zruIX2Jj8OH5QKwQUqP1yNNE/edit">link</a>
      </div> */}
    </FieldContainer>
  );
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path] + '';
  return linkTo ? <CellLink {...linkTo}>{value}</CellLink> : <CellContainer>{value}</CellContainer>;
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
  config: FieldControllerConfig<{html: string}>
): FieldController<string | null, string> & {html: string} => {
  return {
    path: config.path,
    label: config.label,
    html: config.fieldMeta.html,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: null,
    deserialize: data => {
      const value = data[config.path];
      return typeof value === 'string' ? value : null;
    },
    serialize: value => ({ [config.path]: value }),
  };
};