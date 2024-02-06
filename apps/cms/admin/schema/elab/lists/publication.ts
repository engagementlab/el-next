import path from 'path';
import { list } from '@keystone-6/core';
import { checkbox, json, relationship, text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';

import { componentBlocks } from '../../../components/component-blocks';
import { azureStorageFile } from '../../../components/fields-azure/src/index';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { azConfig } from '../../azure';

export default list({
  access: allowAll,
  fields: {
    title: text({
      validation: {
        isRequired: true,
      },
    }),
    key: text({
      isIndexed: 'unique',
      isFilterable: true,
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
    createdDate: CreatedTimestamp,
    enabled: checkbox({
      defaultValue: true,
    }),
    year: text({
      validation: {
        isRequired: true,
      },
    }),
    citations: document({
      formatting: true,
      links: true,
      ui: {
        views: './admin/components/component-blocks',
      },
      componentBlocks,
    }),
    file: azureStorageFile({ azureStorageConfig: azConfig, label: 'PDF' }),
    buttons: json({
      label: 'Call to Action Buttons',
      ui: {
        views: path.join(process.cwd(), '/admin/components/callToAction.tsx'),
      },
    }),
    relatedProject: relationship({
      ref: 'ResearchProject.publicationRelated',
      ui: { hideCreate: true, description: 'Optional' },
    }),
  },
  hooks: {
    resolveInput: async ({
      listKey,
      operation,
      inputData,
      item,
      resolvedData,
      context,
    }) => {
      if (resolvedData.title) {
        resolvedData = {
          ...resolvedData,
          key: CreateKey(resolvedData.title as string),
        };
      }
      return resolvedData;
    },
  },
  ui: {
    listView: {
      initialColumns: ['title', 'year'],
      initialSort: { field: 'year', direction: 'DESC' },
    },
  },
});
