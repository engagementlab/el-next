import { group, list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { componentBlocks } from '../../../components/component-blocks';
import { FixButtons } from '../../hooks';
import { cloudinaryImage } from '../../../components/cloudinary';

const InitiativesLanding: Lists.InitiativesLanding = list({
  access: allowAll,
  fields: {
    name: text({
      isIndexed: 'unique',
      isFilterable: true,
      defaultValue: 'Initiatives Landing Page',
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
        intro: text({
          ui: {
            displayMode: 'textarea',
          },
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
    tngvi: document({
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
      label: 'TNGVI Summary',
      componentBlocks,
    }),
    tn4ej: document({
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
      label: 'TN4EJ Summary',
      componentBlocks,
    }),
    everythingElse: document({
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
  },
  ui: {
    hideCreate: true,
    hideDelete: true,
    listView: {
      initialColumns: ['name'],
    },
    label: 'Initiatives Landing',
  },
});
export default InitiativesLanding;
