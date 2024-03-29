import {
  list
} from '@keystone-6/core';
import {
  checkbox,
  integer,
  json,
  relationship,
  text
} from '@keystone-6/core/fields';
import {
  document
} from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import {
  Lists
} from '.keystone/types';
import path from 'path';
import {
  componentBlocks
} from '../../../components/component-blocks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { helper } from '../../../components/helper';

const Studio: Lists.Studio = list({
    access: allowAll,
  fields: {
    name: text({
      validation: {
        isRequired: true
      }
    }),
    key: text({
      isIndexed: 'unique',
      isFilterable: true,
      ui: {
        createView: {
          fieldMode:'hidden'
        },
        itemView: {
          fieldMode: 'hidden'
        }
      }
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
        folder: 'tngvi/studios',
      },
    }),
    blurb: text({
      label: 'Blurb (appears on Studios index page)',
      validation: {
        isRequired: true
      },
      ui: {
        displayMode: 'textarea'
      }
    }),
    filters: relationship({
      ref: 'Filter',
      isFilterable: true,
      many: true,
      ui: {
        displayMode: 'select',
      }
    }),
    associatedPeople: relationship({
      ref: 'Person.studios',
      many: true,
      ui: {
        description: 'Use + button -> "Associated People" on toolbar to display in Content document.'
      }
    }),
    helper: helper({
      html: 'Please follow the <a href="https://docs.google.com/document/d/19eTH_wqDlXfsP8ODPz7zruIX2Jj8OH5QKwQUqP1yNNE/edit" target="_blank">Studio Template</a>.',
      ui: {
        itemView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
      }
    }),
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
      layouts: [
        // [1, 1],
        // [1, 1, 1],
        [2, 1],
        // [1, 2],
        // [1, 2, 1],
      ],
      // relationships: {
      //   people: {
      //     listKey: 'Person',
      //     label: 'People Involved',
      //     selection: 'id name',
      //   },
      // },
      ui: {
        views: './admin/components/component-blocks',
      },

      componentBlocks,
    }),
    // associatedMedia: relationship({
    //   ref: 'MediaItem',
    //   many: true,
    //   ui: {
    //     displayMode: 'select',
    //   }
    // }),

    // file: azureStorageFile({ azureStorageConfig: azConfig }),
  },
  ui: {
    listView: { 
      initialColumns: ['name', 'order', 'thumbnail',],
      initialSort: { field: 'order', direction: 'ASC' }
    }
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
      if(resolvedData.name) {

        resolvedData = {
          ...resolvedData,
          key: CreateKey(resolvedData.name)
        }

      }
      return resolvedData;
    }
  }
});
export default Studio;