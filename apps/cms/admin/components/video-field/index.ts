import {
  BaseListTypeInfo,
  fieldType,
  FieldTypeFunc,
  CommonFieldConfig,
} from '@keystone-6/core/types';
import { graphql } from '@keystone-6/core';

type VideoInput = {
  file: string;
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
    file: graphql.field({ type: graphql.String }),
    label: graphql.field({
      type: graphql.String,
    }),
    caption: graphql.field({ type: graphql.String }),
    thumbUrl: graphql.field({ type: graphql.String }),
    thumbSmUrl: graphql.field({ type: graphql.String }),
  },
});

export type VideoFieldConfig<ListTypeInfo extends BaseListTypeInfo> =
  CommonFieldConfig<ListTypeInfo> & VideoOutput;

export function video<ListTypeInfo extends BaseListTypeInfo>(
  {
    file,
    label,
    caption,
    thumbUrl,
    thumbSmUrl,
    ...config
  }: VideoFieldConfig<ListTypeInfo> = {
    file: '',
    label: '',
    caption: '',
    thumbUrl: '',
    thumbSmUrl: '',
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
        label: {
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
        thumbSmUrl: {
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
              file: val?.file || '',
              label: val?.label || '',
              caption: val?.caption || '',
              thumbUrl: val?.thumbUrl || '',
              thumbSmUrl: val?.thumbSmUrl || '',
            };
          },
        },
        update: {
          arg: graphql.arg({ type: VideoFieldInput }),
          resolve(val) {
            return {
              file: val?.file || '',
              label: val?.label || '',
              caption: val?.caption || '',
              thumbUrl: val?.thumbUrl || '',
              thumbSmUrl: val?.thumbSmUrl || '',
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
        return {
          file: '',
        };
      },
    });
}
