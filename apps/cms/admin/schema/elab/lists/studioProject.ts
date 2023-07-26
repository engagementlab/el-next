import { group, list } from '@keystone-6/core';
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
import { PartnersSelect } from './partners';

import { Flags } from '../flags';

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
    filters: relationship({
      ref: 'Filter.studioProjects',
      isFilterable: true,
      many: true,
      ui: {
        displayMode: 'select',
      },
    }),
    flags: Flags,
    thumbnail: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/studios/projects',
      },
    }),
    thumbAltText: text({
      validation: {
        isRequired: true,
      },
      label: 'Thumbail Alt Text ♿',
      ui: { description: 'Describe appearance of Thumbnail/Header Image' },
    }),
    shortDescription: text({
      validation: {
        isRequired: true,
      },
      ui: { description: 'Displays in project listing under thumbnail.' },
    }),
    buttons: json({
      label: 'Call to Action Buttons',
      ui: {
        views: path.join(process.cwd(), '/admin/components/callToAction.tsx'),
      },
    }),
    blurb: document({
      links: true,
      ui: {
        description: 'Appears when item is featured.',
      },
    }),
    partners: PartnersSelect,
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
    // ...group({
    //   label: 'Images',
    //   description: 'Project thumbnail and header image',
    //   fields: { impactLinks: json({
    //   ui: {
    //     views: path.join(
    //       process.cwd(),
    //       '/admin/components/video/components.tsx'
    //     ),}})}}),
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
      if (resolvedData.name) {
        resolvedData = {
          ...resolvedData,
          key: CreateKey(resolvedData.name as string),
        };
      }
      return resolvedData;
    },
  },
});
export default StudioProject;
