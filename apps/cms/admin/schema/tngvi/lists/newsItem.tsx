import { DocumentRenderer } from '@keystone-6/document-renderer';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import {
  graphql,
    list
  } from '@keystone-6/core';
import {
  checkbox,
    json,
    multiselect,
    relationship,
    text,
    timestamp,
    virtual
} from '@keystone-6/core/fields';
import {
    document
} from '@keystone-6/fields-document';
import {
    Lists
} from '.keystone/types';
import path from 'path';
import { componentBlocks } from '../../../components/component-blocks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { BlockRenderers } from '@el-next/components';

export function renderContent(content: any) {
  return ReactDOMServer.renderToString(<DocumentRenderer document={content} componentBlocks={BlockRenderers()} />);
}
const NewsItem: Lists.NewsItem = list({
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
      apps: multiselect({
        label: 'Where should this be published?',
        type: 'enum',
        options: [
          { label: 'ELab Home', value: 'elab' },
          { label: 'TNGVI', value: 'tngvim' },
        ],
        ui:
        { description: 'Where should this be published?', }
      }),
      thumbnail: cloudinaryImage({
        label: 'Thumbnail/Header Image',
        cloudinary: {
          cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
          apiKey: `${process.env.CLOUDINARY_KEY}`,
          apiSecret: `${process.env.CLOUDINARY_SECRET}`,
          folder: 'tngvi/news',
        },
      }),
      thumbAltText: text({
        validation: {
          isRequired: true
        },
        label: 'Describe appearance of Thumbnail/Header Image'
      }),
      publishDate: timestamp({
          validation:{
              isRequired: true,
          }
      }),
      externalLink: text({
        label: 'External link'
      }),
      blurb: text({
        label: 'Blurb (appears on News index page)',
        validation: {
          isRequired: true
        },
        ui: {
          displayMode: 'textarea'
        }
      }),
      bodyHTML: virtual({
        field: graphql.field({
          type: graphql.String,
          resolve(item, args, context) {
            //@ts-ignore
            console.log(item.body)
            return renderContent(item.body);
          },
        }),
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'hidden' }
        }
      }),
      body: document({
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
              [1, 1],
              [1, 1, 1],
              [2, 1],
              [1, 2],
              [1, 2, 1],
          ],
          ui: {
              views: path.join(process.cwd(), 'admin/components/component-blocks')
          },
          componentBlocks,
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
        if(resolvedData.title) {
  
          resolvedData = {
            ...resolvedData,
            key: CreateKey(resolvedData.title)
          }
  
        }
        return resolvedData;
      }
    },
    ui: {
      description: 'If external link is used, body is not required.',
      listView: { 
        initialColumns: ['title', 'publishDate', 'thumbnail'],
        initialSort: { field: 'publishDate', direction: 'DESC' },
      }
    },
  });
  export default NewsItem;