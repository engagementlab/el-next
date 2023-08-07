import { group, list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { componentBlocks } from '../../../components/component-blocks';
import { FixButtons } from '../../hooks';
import { cloudinaryImage } from '../../../components/cloudinary';

const LearningPartners: Lists.LearningPartners = list({
  access: allowAll,
  fields: {
    name: text({
      isIndexed: 'unique',
      isFilterable: true,
      defaultValue: 'Learning Partners Landing Page',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'read',
        },
      },
    }),
    ...group({
      label: 'Intro Fields',
      fields: {
        intro: document({
          formatting: {
            headingLevels: [4],
          },
          links: true,
          ui: {
            views: './admin/components/component-blocks',
            description: 'Set "Heading 4" for application information block',
          },
          componentBlocks,
        }),
        introImage: cloudinaryImage({
          //   label: 'Thumbnail/Header Image',
          cloudinary: {
            cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
            apiKey: `${process.env.CLOUDINARY_KEY}`,
            apiSecret: `${process.env.CLOUDINARY_SECRET}`,
            folder: 'elab-home-v3.x/landings',
          },
        }),
        introImageAltText: text({
          validation: {
            isRequired: true,
          },
          label: 'Intro Image Alt Text ♿',
          ui: { description: 'Describe appearance of Intro Image' },
        }),
        introImageCaption: text(),
      },
    }),
    what: document({
      formatting: true,
      links: true,
      layouts: [
        [1, 1],
        [2, 1],
        [1, 2],
      ],
      ui: {
        views: './admin/components/component-blocks',
        // description: 'Set "Heading 2" for courses heading',
      },
      label: 'What are Learning Partners?',
      componentBlocks,
    }),
    benefits: document({
      formatting: true,
      links: true,
      layouts: [
        [1, 1],
        [2, 1],
        [1, 2],
      ],
      ui: {
        views: './admin/components/component-blocks',
      },
      componentBlocks,
    }),
    spotlight: relationship({
      ref: 'NewsItem.learningPartners',
      many: true,
      ui: { hideCreate: true },
    }),
  },
  ui: {
    hideCreate: true,
    hideDelete: true,
    listView: {
      initialColumns: ['name'],
    },
    label: 'Learning Partners',
  },
  graphql: { plural: 'LearningPartner' },
});
export default LearningPartners;
