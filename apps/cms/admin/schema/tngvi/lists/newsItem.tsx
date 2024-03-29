import { DocumentRenderer } from '@keystone-6/document-renderer';
import React from 'react';
import { graphql, list } from '@keystone-6/core';
import {
  checkbox,
  json,
  multiselect,
  relationship,
  text,
  timestamp,
  virtual,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import path from 'path';
import { componentBlocks } from '../../../components/component-blocks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { BlockRenderers } from '@el-next/components';
import { helper, HelperIcon } from '../../../components/helper';

const NewsItem: Lists.NewsItem = list({
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
    apps: multiselect({
      label: 'Where should this be published?',
      type: 'enum',
      options: [
        { label: 'ELab Home', value: 'elab' },
        { label: 'TNGVI', value: 'tngvi' },
      ],
      ui: {
        description: 'Specify the app(s) this item will be published to.',
      },
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
        isRequired: true,
      },
      label: 'Describe appearance of Thumbnail/Header Image',
    }),
    publishDate: timestamp({
      validation: {
        isRequired: true,
      },
      ui: {
        description:
          'This field is purely cosmetic, not to schedule this item for future publishing. News items for the future should not be enabled until ready for review and publishing.',
      },
    }),
    linkHelper: helper({
      html: 'If external link is used, <em>body</em> is not required.',
      iconType: HelperIcon.info,
      ui: {
        listView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
    source: text({
      ui: {
        description: 'e.g. The Boston Globe, CommonWealth Magazine',
      },
    }),
    externalLink: text({
      label: 'External link',
    }),
    blurb: text({
      label: 'Blurb',
      validation: {
        isRequired: true,
      },
      ui: {
        displayMode: 'textarea',
        description: 'Appears on News index page.',
      },
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
        views: './admin/components/component-blocks',
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
      if (resolvedData.title) {
        resolvedData = {
          ...resolvedData,
          key: CreateKey(resolvedData.title),
        };
      }
      return resolvedData;
    },
  },
  ui: {
    listView: {
      initialColumns: ['title', 'publishDate', 'thumbnail'],
      initialSort: { field: 'publishDate', direction: 'DESC' },
    },
  },
});
export default NewsItem;
