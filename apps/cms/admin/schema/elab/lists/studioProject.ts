import { list } from '@keystone-6/core';
import {
  checkbox,
  json,
  relationship,
  select,
  text,
  timestamp,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import path from 'path';
import { componentBlocks } from '../../../components/component-blocks';
import { azureStorageFile } from '../../../components/fields-azure/src/index';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { azConfig } from '../../azure';
import { Partners } from '../partners';

const StudioProject: Lists.MediaItem = list({
  access: allowAll,
  fields: {
    name: text({
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
    thumbnail: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/studios/projects',
      },
    }),
    thumbailAltText: text({
      validation: {
        isRequired: true,
      },
      label: 'Thumbail Alt Text ♿',
    }),
    shortDescription: text({
      validation: {
        isRequired: true,
      },
      ui: { description: 'Displays in project listing under thumbnail.' },
    }),
    blurb: text({
      validation: {
        isRequired: true,
      },
      ui: { displayMode: 'textarea' },
    }),
    initiative: select({
      type: 'enum',
      options: [
        { label: 'Gun Violence', value: 'GunViolence' },
        { label: 'Climate', value: 'Climate' },
        // { label: 'Studio Dept', value: 'Departments' },
      ],
      validation: { isRequired: true },
      ui: { displayMode: 'select' },
      defaultValue: 'GunViolence',
    }),
    partners: Partners,
    coCreation: document({
      formatting: true,
      dividers: true,
      links: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      ui: {
        views: './admin/components/component-blocks',
      },
      label: 'Co-Creation Process',

      componentBlocks,
    }),
    impact: document({
      formatting: true,
      dividers: true,
      links: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      ui: {
        views: './admin/components/component-blocks',
      },
      label: 'Impact Beyond the Studio',
      componentBlocks,
    }),
    // videos: json({
    //   ui: {
    //     views: path.join(
    //       process.cwd(),
    //       '/admin/components/video/components.tsx'
    //     ),
    //     // createView: { fieldMode: 'edit' },
    //     // listView: { fieldMode: 'hidden' },
    //     // itemView: { fieldMode: 'edit' },
    //   },
    // }),
    // file: azureStorageFile({ azureStorageConfig: azConfig, label: 'PDF' }),

    team: relationship({
      ref: 'Person.projectTeam',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'title'],
        inlineConnect: true,
      },
    }),
    semester: relationship({
      ref: 'Semester.projects',
      many: true,
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
});
export default StudioProject;
