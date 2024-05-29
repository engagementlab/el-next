import {
  BaseListTypeInfo,
  fieldType,
  FieldTypeFunc,
  CommonFieldConfig,
} from '@keystone-6/core/types';
import { graphql } from '@keystone-6/core';
import { GraphQLResolveInfo } from 'graphql';

type VideoInput = {
  file: string | null;
  label: string;
  caption?: string;
  thumbUrl: string;
  thumbSmUrl: string;
};
type VideoOutput = VideoInput;

const VideoFieldInput = graphql.inputObject({
  name: 'VideoFieldInput',
  fields: {
    file: graphql.arg({
      type: graphql.String,
    }),
    label: graphql.arg({
      type: graphql.String,
    }),
    caption: graphql.arg({ type: graphql.String }),
    thumbUrl: graphql.arg({ type: graphql.String }),
    thumbSmUrl: graphql.arg({ type: graphql.String }),
  },
});
const VideoFieldOutput = graphql.object<VideoOutput>()({
  name: 'VideoFieldOutput',
  fields: {
    file: graphql.field({
      type: graphql.String,
    }),
    label: graphql.field({
      type: graphql.String,
    }),
    caption: graphql.field({ type: graphql.String }),
    thumbUrl: graphql.field({ type: graphql.String }),
    thumbSmUrl: graphql.field({ type: graphql.String }),
  },
});

export type VideoFieldConfig<ListTypeInfo extends BaseListTypeInfo> =
  CommonFieldConfig<ListTypeInfo>;

const resolveInput = (val: VideoInput) => {
  return {
    file: val?.file || undefined,
    label: val?.label || undefined,
    caption: val?.caption || undefined,
    thumbUrl: val?.thumbUrl || undefined,
    thumbSmUrl: val?.thumbSmUrl || undefined,
  };
};

export function video<ListTypeInfo extends BaseListTypeInfo>({
  ...config
}: VideoFieldConfig<ListTypeInfo> = {}): FieldTypeFunc<ListTypeInfo> {
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
            value: '',
          },
        },
        label: {
          kind: 'scalar',
          scalar: 'String',
          mode: 'required',
          default: {
            kind: 'literal',
            value: '',
          },
        },
        caption: { kind: 'scalar', scalar: 'String', mode: 'optional' },
        thumbUrl: {
          kind: 'scalar',
          scalar: 'String',
          mode: 'required',
          default: {
            kind: 'literal',
            value: '',
          },
        },
        thumbSmUrl: {
          kind: 'scalar',
          scalar: 'String',
          mode: 'required',
          default: {
            kind: 'literal',
            value: '',
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
              file: val?.file || undefined,
              label: val?.label || undefined,
              caption: val?.caption || undefined,
              thumbUrl: val?.thumbUrl || undefined,
              thumbSmUrl: val?.thumbSmUrl || undefined,
            };
          },
        },
        update: {
          arg: graphql.arg({ type: VideoFieldInput }),
          resolve(val) {
            return {
              file: val?.file || undefined,
              label: val?.label || undefined,
              caption: val?.caption || undefined,
              thumbUrl: val?.thumbUrl || undefined,
              thumbSmUrl: val?.thumbSmUrl || undefined,
            };
          },
        },
      },
      output: graphql.field({
        type: VideoFieldOutput,
        async resolve({
          value: { file, label, caption, thumbUrl, thumbSmUrl },
        }) {
          const captionResolved = caption ? caption : undefined;
          if (file === null || label === null) {
            return null;
          }

          return {
            file,
            label,
            caption: captionResolved,
            thumbUrl,
            thumbSmUrl,
          };
        },
      }),

      views: './admin/components/video-field/views',

      getAdminMeta() {
        return {};
      },
    });
}
