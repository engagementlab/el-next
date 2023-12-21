import { group, list } from '@keystone-6/core';
import { multiselect, text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { componentBlocks } from '../../../components/component-blocks';

import { cloudinaryImage } from '../../../components/cloudinary';

const InitiativesLanding: Lists.InitiativesLanding = list({
  access: allowAll,
  fields: {
    name: text({
      isIndexed: 'unique',
      isFilterable: true,
      defaultValue: 'Blurbs',
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
      label: 'Initiatives Landing Page Fields',
      fields: {
        intro: document({
          formatting: true,
          links: true,
          ui: {
            views: './admin/components/component-blocks',
          },
          componentBlocks,
        }),
        introImage: cloudinaryImage({
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
    }),
    projectsBlurb: document({
      label: 'Projects Page Blurb',
      formatting: true,
    }),
    studiosBlurb: document({
      label: 'Studios Page Blurb',
      formatting: true,
    }),
    researchProjectsBlurb: document({
      label: 'Research Projects Blurb',
      formatting: true,
    }),
    publicationsBlurb: document({
      label: 'Publications Blurb',
      formatting: true,
    }),
    homepageOrder: multiselect({
      label: 'Homepage Section Ordering',
      type: 'enum',
      options: [
        { label: 'Events', value: 'events' },
        { label: 'News', value: 'news' },
        { label: 'Studio/Research Projects', value: 'projects' },
        { label: 'Studios', value: 'studios' },
      ],
    }),
  },
  ui: {
    hideCreate: true,
    hideDelete: true,
    listView: {
      initialColumns: ['name'],
    },
    label: 'Blurbs',
  },
});
export default InitiativesLanding;
