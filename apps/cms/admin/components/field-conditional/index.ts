import {
  type BaseListTypeInfo,
  fieldType,
  type FieldTypeFunc,
  type CommonFieldConfig,
  orderDirectionEnum,
  BaseFields,
} from '@keystone-6/core/types';
import { graphql } from '@keystone-6/core';

type TextFieldConfig<ListTypeInfo extends BaseListTypeInfo> =
  CommonFieldConfig<ListTypeInfo> & {
    isIndexed?: boolean | 'unique';
    dependency: {
      field: string;
      neededValue: any;
      queryPath: string;
    };

    fields?: BaseFields<ListTypeInfo>;
  };
}

let i = 0;
export function conditional<ListTypeInfo extends BaseListTypeInfo>(
  isIndexed,
  dependency,
  // config: {
  // label: string,
  // description?: string,
  fields: BaseFields<ListTypeInfo>
  // }
): BaseFields<ListTypeInfo>  {
  const keys = Object.keys(fields);
  if (keys.some((key) => key.startsWith('__group'))) {
    throw new Error('groups cannot be nested');
  }

  return {
    [`__group${i++}`]: {
      fields: keys,
      label: 'CONDITIONAL',
      description: null,
    },
    fields,
  } as any; // TODO: FIXME, see initialise-lists.ts:getListsWithInitialisedFields

  // return (meta) =>
  //   fieldType({
  //     kind: 'scalar',
  //     mode: 'optional',
  //     scalar: 'String',
  //     index: isIndexed === true ? 'index' : isIndexed || undefined,
  //   })({
  //     ...config,
  //     input: {
  //       create: {
  //         arg: graphql.arg({ type: graphql.String }),
  //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //         resolve(value, context) {
  //           return value;
  //         },
  //       },
  //       update: { arg: graphql.arg({ type: graphql.String }) },
  //       orderBy: { arg: graphql.arg({ type: orderDirectionEnum }) },
  //     },
  //     output: graphql.field({
  //       type: graphql.String,
  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //       resolve({ value, item }, args, context, info) {
  //         return value;
  //       },
  //     }),

  //     views: './admin/components/field-conditional/views',

  //     getAdminMeta() {
  //       return {
  //         dependency,
  //       };
  //     },
  //   });
}
