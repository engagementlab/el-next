import {
    list
  } from '@keystone-6/core';
import {
  checkbox,
    json,
    relationship,
    select,
    text,
    timestamp
} from '@keystone-6/core/fields';
import {
    document
} from '@keystone-6/fields-document';
import { allowAll } from "@keystone-6/core/access"
import {
    Lists
} from '.keystone/types';
import path from 'path';
import { componentBlocks } from '../../../components/component-blocks';
import { azureStorageFile } from '../../../components/fields-azure/src/index';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { azConfig } from '../../azure';

const MediaItem: Lists.MediaItem = list({
    access: allowAll,
    fields: {
      title: text({
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
      thumbnail: cloudinaryImage({
        cloudinary: {
          cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
          apiKey: `${process.env.CLOUDINARY_KEY}`,
          apiSecret: `${process.env.CLOUDINARY_SECRET}`,
          folder: 'tngvi/media',
        },
      }),
      shortDescription: text({
        validation: {
          isRequired: true
        },
        ui: { displayMode: 'textarea' },
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
        ref: 'Person.mediaItems',
        many: true,
        ui: {
          description: 'Use + button -> "Associated People" on toolbar to display in Content document.'
        }
      }),
      content: document({
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
          views: './admin/components/component-blocks'
        },
  
        componentBlocks,
      }),
      // galleryImages: relationship({
      //   ref: 'MediaImage.mediaGalleryImages',
      //   many: true,
      //   label: "Gallery Images",
      //   ui: {
      //     displayMode: 'cards',
      //     cardFields: ['image', 'altText', 'caption'],
      //     inlineCreate: {
      //       fields: ['image', 'altText', 'caption']
      //     },
      //     inlineEdit: {
      //       fields: ['image', 'altText', 'caption']
      //     },
      //   },
      // }),
      videos: json({
        ui: {
          views: path.join(process.cwd(), '/admin/components/video/components.tsx'),
          createView: { fieldMode: 'edit' },
          listView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'edit' },
        },
      }),
      file: azureStorageFile({ azureStorageConfig: azConfig, label: 'PDF' }),
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
        if(resolvedData.title) {
  
          resolvedData = {
            ...resolvedData,
            key: CreateKey(resolvedData.title)
          }
  
        }
        return resolvedData;
      }
    }
  });
  export default MediaItem;