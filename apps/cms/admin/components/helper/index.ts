import path from 'path';
import {
  BaseListTypeInfo,
  fieldType,
  FieldTypeFunc,
  CommonFieldConfig,
  orderDirectionEnum,
} from '@keystone-6/core/types';
import { graphql } from '@keystone-6/core';

export type HelperFieldConfig<ListTypeInfo extends BaseListTypeInfo> =
  CommonFieldConfig<ListTypeInfo> & {
    html: string;
  };

export function helper<ListTypeInfo extends BaseListTypeInfo>(
  { html, ...config }: HelperFieldConfig<ListTypeInfo> = {
    html: '<p>html needed!</p>',
  }
): FieldTypeFunc<ListTypeInfo> {
  return (meta) =>
    fieldType({
      kind: 'scalar',
      mode: 'optional',
      scalar: 'String',
    })({
      ...config,
      input: {
        create: {
          arg: graphql.arg({ type: graphql.String }),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          resolve(value, context) {
            return value;
          },
        },
        update: { arg: graphql.arg({ type: graphql.String }) },
        orderBy: { arg: graphql.arg({ type: orderDirectionEnum }) },
      },
      output: graphql.field({
        type: graphql.String,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve({ value, item }, args, context, info) {
          return value;
        },
      }),
      views: 'views',
      getAdminMeta() {
        return { html };
      },
    });
}
