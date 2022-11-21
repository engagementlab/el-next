import { BaseListTypeInfo } from '@keystone-6/core/types';
import { DocumentFieldConfig } from '@keystone-6/fields-document';
import { componentBlocks } from '../components/component-blocks';
import { FixButtons } from './hooks';

const BaseDocConfig = (
  layouts?: number[][]
): DocumentFieldConfig<BaseListTypeInfo> => {
  return {
    componentBlocks,
    formatting: true,
    layouts: layouts || [
      [1, 1],
      [1, 1, 1],
      [2, 1],
      [1, 2],
    ],
    ui: {
      views: './admin/components/component-blocks',
    },
    hooks: {
      resolveInput: ({ resolvedData }: any) => {
        return FixButtons(resolvedData);
      },
    },
  };
};

export { BaseDocConfig };
