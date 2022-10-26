import React from 'react';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
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
import { fields } from '@keystone-6/core/dist/declarations/src/types/schema/schema-api-with-context';

const styles = {
  icon: emCss  `
      display: inline-block;
      margin-right: 1rem;`,
  field: emCss `
      display: flex;
      align-items: center;
      background-color: #F6A5365E;
      padding: .5rem;
    `,
};

export function Field({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) {

    const helpIconHtml =  <svg viewBox="2 2 24 24" width="24" height="24" className={styles.icon}>       
                            <g transform="matrix(0.545455, 0, 0, 0.545455, 0.909091, 0.909091)">
                              <g>
                                <circle cx="24" cy="24" fill="#E1F5FE" r="21.5"></circle>
                                <path d="M24,46C11.869,46,2,36.131,2,24S11.869,2,24,2s22,9.869,22,22S36.131,46,24,46z M24,3    C12.42,3,3,12.42,3,24s9.42,21,21,21s21-9.42,21-21S35.58,3,24,3z" fill="#0277BD"></path>
                              </g>
                              <path d="M24,45C12.42,45,3,35.58,3,24S12.42,3,24,3s21,9.42,21,21S35.58,45,24,45z M24,4C12.972,4,4,12.972,4,24   s8.972,20,20,20s20-8.972,20-20S35.028,4,24,4z" fill="#FFFFFF"></path>
                              <g id="question">
                                <g>
                                  <circle cx="24" cy="38.5" fill="#FFE57F" r="3"></circle>
                                  <path d="M22,39c-0.276,0-0.5-0.224-0.5-0.5c0-1.378,1.122-2.5,2.5-2.5c0.46,0,0.911,0.126,1.303,0.366     c0.235,0.144,0.31,0.452,0.166,0.688c-0.144,0.235-0.452,0.31-0.688,0.166C24.547,37.076,24.276,37,24,37     c-0.827,0-1.5,0.673-1.5,1.5C22.5,38.776,22.276,39,22,39z" fill="#FFF8E1"></path>
                                  <path d="M24,42c-1.93,0-3.5-1.57-3.5-3.5S22.07,35,24,35s3.5,1.57,3.5,3.5c0,0.373-0.059,0.74-0.174,1.091     c-0.087,0.263-0.37,0.406-0.631,0.319c-0.263-0.086-0.405-0.369-0.319-0.631c0.083-0.251,0.124-0.513,0.124-0.779     c0-1.378-1.122-2.5-2.5-2.5s-2.5,1.122-2.5,2.5S22.622,41,24,41c0.396,0,0.776-0.09,1.128-0.269     c0.247-0.126,0.546-0.026,0.672,0.221c0.125,0.246,0.026,0.547-0.221,0.672C25.086,41.874,24.555,42,24,42z" fill="#0277BD"></path>
                                </g>
                                <g>
                                  <path d="M24,32.5c-1.274,0-2.308-1.031-2.308-2.301v-0.767c0-2.715,0.783-4.676,2.463-6.171     c0.574-0.511,1.192-0.955,1.79-1.381c1.997-1.431,3.439-2.463,3.439-5.488c0-3.06-1.967-4.647-3.809-5.115     c-2.168-0.553-5.209,0.192-7.242,3.914c-0.609,1.116-2.011,1.528-3.129,0.921c-1.12-0.607-1.533-2.005-0.924-3.121     c2.716-4.979,7.599-7.405,12.433-6.174C31.072,7.922,34,11.77,34,16.392c0,5.386-3.099,7.604-5.362,9.226     c-0.523,0.375-1.018,0.728-1.41,1.077c-0.367,0.327-0.92,0.82-0.92,2.737v0.767C26.308,31.469,25.275,32.5,24,32.5z" fill="#FFE57F"></path>
                                  <path d="M24,33c-1.548,0-2.808-1.257-2.808-2.801v-0.767c0-2.868,0.836-4.948,2.631-6.544     c0.607-0.541,1.258-1.005,1.832-1.415c1.946-1.395,3.229-2.314,3.229-5.081c0-2.771-1.773-4.209-3.432-4.631     c-1.985-0.503-4.781,0.192-6.68,3.669c-0.74,1.355-2.448,1.858-3.807,1.121c-0.66-0.357-1.14-0.95-1.352-1.668     c-0.212-0.718-0.131-1.475,0.228-2.132c2.831-5.189,7.931-7.711,12.996-6.418c4.583,1.163,7.662,5.205,7.662,10.06     c0,5.642-3.219,7.947-5.57,9.631c-0.514,0.368-0.998,0.714-1.37,1.045c-0.318,0.283-0.753,0.67-0.753,2.364v0.767     C26.808,31.743,25.548,33,24,33z M24.252,10.612c0.507,0,0.995,0.064,1.447,0.18c2.023,0.514,4.185,2.255,4.185,5.6     c0,3.279-1.608,4.432-3.644,5.891c-0.559,0.399-1.186,0.847-1.753,1.352c-1.566,1.394-2.296,3.235-2.296,5.797v0.767     C22.192,31.192,23.003,32,24,32s1.808-0.808,1.808-1.801v-0.767c0-1.976,0.562-2.642,1.088-3.111     c0.412-0.367,0.917-0.728,1.451-1.11c2.297-1.646,5.154-3.691,5.154-8.819c0-4.389-2.776-8.042-6.909-9.09     c-4.605-1.174-9.266,1.153-11.871,5.928c-0.23,0.422-0.283,0.909-0.146,1.37c0.137,0.462,0.445,0.843,0.87,1.073     c0.877,0.475,1.976,0.151,2.452-0.722C19.65,11.739,22.127,10.612,24.252,10.612z" fill="#0277BD"></path>
                                </g>
                                <path d="M15.159,13.969c-0.081,0-0.163-0.02-0.239-0.061c-0.243-0.132-0.332-0.436-0.2-0.678    c2.605-4.776,7.266-7.103,11.872-5.929c1.915,0.486,3.577,1.539,4.808,3.046c0.175,0.214,0.143,0.529-0.071,0.704    c-0.216,0.174-0.53,0.143-0.704-0.071c-1.094-1.34-2.574-2.277-4.28-2.71c-4.148-1.058-8.368,1.077-10.747,5.438    C15.507,13.875,15.336,13.969,15.159,13.969z" fill="#FFF8E1"></path>
                                <path d="M22.692,29.932c-0.276,0-0.5-0.224-0.5-0.5c0-2.597,0.708-4.385,2.296-5.798    c0.566-0.504,1.196-0.954,1.752-1.35c1.57-1.126,2.926-2.098,3.428-4.027c0.069-0.268,0.341-0.426,0.61-0.358    c0.267,0.069,0.427,0.343,0.358,0.61c-0.593,2.28-2.157,3.401-3.813,4.587c-0.538,0.384-1.145,0.816-1.67,1.285    c-1.356,1.207-1.961,2.765-1.961,5.051C23.192,29.708,22.969,29.932,22.692,29.932z" fill="#FFF8E1"></path>
                              </g>
                            </g>
                          </svg>;
    const infoIconHtml = <svg viewBox="0 -0.099 24 24.168" width="24" height="24.168" className={styles.icon}>
                          <g transform="matrix(0.1875, 0, 0, 0.1875, 0, 0)">
                            <g>
                              <ellipse style={{'fill': 'white'}} cx="63.576" cy="63.921" rx="63.251" ry="64.448"></ellipse>
                              <path fill="#B0BEC5" d="M64,0C28.656,0,0,28.656,0,64s28.656,64,64,64s64-28.656,64-64S99.344,0,64,0z M64,120
                              C33.125,120,8,94.875,8,64S33.125,8,64,8s56,25.125,56,56S94.875,120,64,120z"></path>
                            </g>
                          </g>
                          <g transform="matrix(0.1875, 0, 0, 0.1875, 0, 0)">
                            <g>
                              <path fill="#03A9F4" d="M64,48c-4.414,0-8,3.586-8,8v40c0,4.414,3.586,8,8,8s8-3.586,8-8V56C72,51.586,68.414,48,64,48z M64,40
                              c4.414,0,8-3.586,8-8s-3.586-8-8-8s-8,3.586-8,8S59.586,40,64,40z"></path>
                            </g>
                          </g>
                        </svg>;
    let thisIcon = helpIconHtml;
    if(field.iconType === 'info')
      thisIcon = infoIconHtml;
    return (
    <FieldContainer as="fieldset" className={styles.field}>
        {thisIcon}

      <div dangerouslySetInnerHTML={{__html: field.html}} />
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
  config: FieldControllerConfig<{html: string, iconType?: string}>
): FieldController<string | null, string> & {html: string, iconType?: string} => {
  return {
    path: config.path,
    label: config.label,
    html: config.fieldMeta.html,
    iconType: config.fieldMeta.iconType,
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