import { group, list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { componentBlocks } from '../../../components/component-blocks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { Social } from '../social';

const Undergraduate: Lists.Undergraduate = list({
  access: allowAll,
  fields: {
    name: text({
      isIndexed: 'unique',
      isFilterable: true,
      defaultValue: 'Undergraduate Landing Page',
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
          formatting: true,
          links: true,
          ui: {
            views: './admin/components/component-blocks',
            description: 'Set "Heading 4" for registration information block',
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
    socialImpactDesign: document({
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
    projectSpotlight: relationship({
      ref: 'StudioProject.undergrad',
      many: true,
      ui: { hideCreate: true },
    }),
    ...group(Social()),
  },
  ui: {
    hideCreate: true,
    hideDelete: true,
    listView: {
      initialColumns: ['name'],
    },
    label: 'Undergraduate',
  },
});
export default Undergraduate;
