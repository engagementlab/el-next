import {
  BaseListTypeInfo,
  fieldType,
  FieldTypeFunc,
  CommonFieldConfig,
  orderDirectionEnum,
  KeystoneContext,
} from '@keystone-6/core/types';
import { graphql } from '@keystone-6/core';
import { GraphQLResolveInfo } from 'graphql';

type PairInput = {
  file: string;
  caption?: string;
  thumbUrl: string;
};
type PairOutput = PairInput;

const VideoFieldInput = graphql.inputObject({
  name: 'VideoFieldInput',
  fields: {
    file: graphql.arg({
      type: graphql.String,
    }),
    caption: graphql.arg({ type: graphql.String }),
    thumbUrl: graphql.arg({ type: graphql.String }),
  },
});
const VideoFieldOutput = graphql.object<PairOutput>()({
  name: 'VideoFieldOutput',
  fields: {
    file: graphql.field({ type: graphql.String }),
    caption: graphql.field({ type: graphql.String }),
    thumbUrl: graphql.field({ type: graphql.String }),
  },
});

export type VideoFieldConfig<ListTypeInfo extends BaseListTypeInfo> =
  CommonFieldConfig<ListTypeInfo> & PairOutput;

export function video<ListTypeInfo extends BaseListTypeInfo>(
  { file, caption, thumbUrl, ...config }: VideoFieldConfig<ListTypeInfo> = {
    file: 'none',
    caption: '',
    thumbUrl: '',
  }
): FieldTypeFunc<ListTypeInfo> {
  return (meta) =>
    fieldType({
      kind: 'multi',
      fields: {
        file: {
          kind: 'scalar',
          scalar: 'String',
          mode: 'required',
          default: {
            kind: 'literal',
            value: 'none',
          },
        },
        caption: { kind: 'scalar', scalar: 'String', mode: 'optional' },
        thumbUrl: {
          kind: 'scalar',
          scalar: 'String',
          mode: 'required',
          default: {
            kind: 'literal',
            value: 'none',
          },
        },
      },
    })({
      ...config,
      input: {
        create: {
          arg: graphql.arg({ type: VideoFieldInput }),
          resolve(val) {
            return {
              file: '',
              caption: '',
              thumbUrl: '',
            };
          },
        },
        update: {
          arg: graphql.arg({ type: VideoFieldInput }),
          resolve(val) {
            return {
              file: '',
              caption: '',
              thumbUrl: '',
            };
          },
        },
      },
      output: graphql.field({
        type: VideoFieldOutput,
        async resolve({ value: { file, caption, thumbUrl } }) {
          if (file === null || caption === null) {
            return null;
          }

          return { file, caption, thumbUrl };
        },
      }),

      views: './admin/components/video-field/views',

      getAdminMeta() {
        return {
          file: '',
        };
      },
    });
}
