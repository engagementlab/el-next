import { group, list } from '@keystone-6/core';
import {
  checkbox,
  integer,
  json,
  multiselect,
  relationship,
  select,
  text,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import path from 'path';
import { componentBlocks } from '../../../components/component-blocks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { helper } from '../../../components/helper';
import { Theme } from '../../../../../elab/types';
import { Featuring } from '../featuring';
import { Social } from '../social';
import { Status } from '../flags';

const Studio: Lists.Studio = list({
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
    ...Status,
    thumbnail: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/studios',
      },
    }),
    thumbAltText: text({
      validation: {
        isRequired: true,
      },
      label: 'Thumbnail Alt Text ♿',
      ui: { description: 'Describe appearance of Thumbnail Image' },
    }),
    shortDescription: text({
      validation: {
        isRequired: true,
      },
      ui: { description: 'Displays in studios listing under thumbnail.' },
    }),
    blurb: text({
      label: 'Blurb (appears on Semesters index page)',
      validation: {
        isRequired: true,
      },
      ui: {
        displayMode: 'textarea',
      },
    }),
    semesters: relationship({
      ref: 'Semester.studio',
      many: true,
      ui: { hideCreate: true },
    }),
    initiatives: multiselect({
      type: 'enum',
      options: [
        { label: 'TNGV', value: 'gunviolence' },
        { label: 'TNEJ', value: 'climate' },
      ],
    }),
    ...group(Featuring),
    initiativesRelated: relationship({
      ref: 'Initiative.studios',
      many: true,
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
    ...group(Social('Uses "Short Description" if not specified')),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'status'],
      initialSort: { field: 'name', direction: 'ASC' },
    },
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
          key: CreateKey(resolvedData.name),
        };
      }
      return resolvedData;
    },
  },
});
export default Studio;
