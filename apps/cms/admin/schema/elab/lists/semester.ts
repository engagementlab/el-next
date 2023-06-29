import { list } from '@keystone-6/core';
import {
  checkbox,
  integer,
  json,
  relationship,
  text,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { componentBlocks } from '../../../components/component-blocks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { HelperIcon, helper } from '../../../components/helper';

const Semester: Lists.Semester = list({
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
    order: integer({
      label: 'Order on index page',
    }),
    thumbnail: cloudinaryImage({
      label: 'Thumbnail (need to be sized consistently)',
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/studios',
      },
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
    associatedPeople: relationship({
      ref: 'Person.semesters',
      many: true,
      ui: {
        description:
          'Use + button -> "Associated People" on toolbar to display in Content document.',
      },
    }),
    // helper: helper({
    //   html: 'Please follow the <a href="https://docs.google.com/document/d/19eTH_wqDlXfsP8ODPz7zruIX2Jj8OH5QKwQUqP1yNNE/edit" target="_blank">Semester Template</a>.',
    //   ui: {
    //     itemView: { fieldMode: 'hidden' },
    //     listView: { fieldMode: 'hidden' },
    //   },
    //   iconType: HelperIcon.info,
    // }),
    content: document({
      formatting: {
        headingLevels: [3, 4],
        inlineMarks: true,
        listTypes: true,
        alignment: true,
        blockTypes: true,
        softBreaks: true,
      },
      dividers: true,
      links: true,
      layouts: [[2, 1]],
      ui: {
        views: './admin/components/component-blocks',
      },

      componentBlocks,
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'order', 'thumbnail'],
      initialSort: { field: 'order', direction: 'ASC' },
    },
    label: 'Studio Semester',
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
export default Semester;
