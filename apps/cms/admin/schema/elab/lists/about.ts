import { group, list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

import { componentBlocks } from '../../../components/component-blocks';
import { CreateKey, FixButtons } from '../../hooks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { Social } from '../social';
import { helper, HelperIcon } from '../../../components/helper';

const About: Lists.About = list({
  access: allowAll,
  fields: {
    name: text({
      isIndexed: 'unique',
      isFilterable: true,
      defaultValue: 'About Page',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'read',
        },
      },
    }),
    key: text({
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
    intro: document({
      formatting: true,
      links: true,
    }),
    headingImage: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/about',
      },
    }),
    headingImageAltText: text({
      validation: {
        isRequired: true,
      },
      label: 'Heading Image Alt Text ♿',
      ui: { description: 'Describe appearance of Heading Image.' },
    }),
    headingImageCaption: text(),
    content: document({
      formatting: {
        headingLevels: true,
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
        description: 'For section headers, please use the Heading 2 style.',
        views: './admin/components/component-blocks',
      },
      componentBlocks,

      hooks: {
        resolveInput: async ({
          listKey,
          fieldKey,
          operation,
          inputData,
          item,
          resolvedData,
          context,
        }) => {
          return FixButtons(resolvedData);
        },
      },
    }),
    ...group(Social()),
  },
  ui: {
    hideCreate: true,
    hideDelete: true,
    listView: {
      initialColumns: ['name'],
    },
    label: 'About Section',
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
export default About;
