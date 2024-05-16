import {
  BaseListTypeInfo,
  fieldType,
  FieldTypeFunc,
  CommonFieldConfig,
  orderDirectionEnum,
} from '@keystone-6/core/types';
import { graphql } from '@keystone-6/core';

export enum HelperIcon {
  help = 'help',
  info = 'info',
}
type PairInput = {
  html: string;
  iconType: HelperIcon | string;
};
type PairOutput = PairInput;

const HelperFieldInput = graphql.inputObject({
  name: 'HelperFieldInput',
  fields: {
    html: graphql.arg({ type: graphql.String }),
    iconType: graphql.arg({ type: graphql.String }),
  },
});
const HelperFieldOutput = graphql.object<PairOutput>()({
  name: 'HelperFieldOutput',
  fields: {
    html: graphql.field({ type: graphql.String }),
    iconType: graphql.field({ type: graphql.String }),
  },
});

export type HelperFieldConfig<ListTypeInfo extends BaseListTypeInfo> =
  CommonFieldConfig<ListTypeInfo> & PairOutput;

export function helper<ListTypeInfo extends BaseListTypeInfo>(
  { html, iconType, ...config }: HelperFieldConfig<ListTypeInfo> = {
    html: '<p>html needed!</p>',
    iconType: HelperIcon.help,
  }
): FieldTypeFunc<ListTypeInfo> {
  return (meta) =>
    fieldType({
      kind: 'multi',
      fields: {
        html: {
          kind: 'scalar',
          mode: 'required',
          scalar: 'String',
          default: {
            kind: 'literal',
            value: '<p>Need HTML!</p>',
          },
        },
        iconType: {
          name: 'icon',
          values: ['help', 'info'],
          kind: 'enum',
          mode: 'required',
          default: {
            kind: 'literal',
            value: HelperIcon.help,
          },
        },
      },
    })({
      ...config,
      input: {
        create: {
          arg: graphql.arg({ type: HelperFieldInput }),
          resolve(val) {
            return {
              html: 'not used',
              iconType: HelperIcon.help.toString(),
            };
          },
        },
        update: {
          arg: graphql.arg({ type: HelperFieldInput }),
          resolve(val) {
            return {
              html: 'not used',
              iconType: HelperIcon.help.toString(),
            };
          },
        },
      },
      output: graphql.field({
        type: HelperFieldOutput,
        resolve({ value, item }, args, context, info) {
          if (value === null) {
            return null;
          }

          return value;
        },
      }),

      views: './admin/components/helper/views',

      getAdminMeta() {
        if (iconType === undefined)
          return { html, iconType: HelperIcon.help.toString() };

        if (html !== null && iconType !== undefined)
          return { html, iconType: iconType.toString() };

        return {
          html: '<p>Need HTML!</p>',
          iconType: HelperIcon.help.toString(),
        };
      },
    });
}
