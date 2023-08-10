import { graphql, group, list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { helper, HelperIcon } from '../../../components/helper';
import { componentBlocks } from '../../../components';
// import { HelperIcon, helper } from '../../../components/helper';

const Initiative: Lists.Initiative = list({
  access: allowAll,
  fields: {
    name: text({
      isIndexed: 'unique',
      isFilterable: true,
      defaultValue: 'Initiative Name',
    }),
    intro: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    // helper: helper({
    //   html: 'A slide can be <i>either</i> an image or video. If you define both, only the image will display. ',
    //   iconType: HelperIcon.info,
    //   ui: {
    //     itemView: { fieldMode: 'read' },
    //     listView: { fieldMode: 'hidden' },
    //   },
    // }),
    ...group({
      label: 'Intro Slideshow',
      fields: {
        slides: relationship({
          ref: 'Slide.initiativeSlides',
          many: true,
          ui: {
            description:
              'A slide can be either an image or video. If you define both, only the image will display. ',
            displayMode: 'cards',
            cardFields: ['image', 'altText', 'caption', 'videoId'],
            inlineCreate: {
              fields: ['image', 'altText', 'caption', 'videoId'],
            },
            inlineEdit: {
              fields: ['image', 'altText', 'caption', 'videoId'],
            },
          },
        }),
      },
    }),
    ...group({
      label: "What's New",
      fields: {
        news: relationship({
          ref: 'NewsItem.initiativesWhatsNew',
          many: true,
          ui: { hideCreate: true },
        }),
        events: relationship({
          ref: 'Event.initiativesWhatsNew',
          many: true,
          ui: { hideCreate: true },
        }),
      },
    }),
    body: document({
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
        views: './admin/components/component-blocks',
      },
      componentBlocks,
    }),
    projects: relationship({
      ref: 'StudioProject.initiativesRelated',
      many: true,
      ui: { hideCreate: true },
      label: 'Featured Projects',
    }),
    studios: relationship({
      ref: 'Studio.initiativesRelated',
      many: true,
      ui: { hideCreate: true },
      label: 'Recent Studios',
    }),
    research: relationship({
      ref: 'ResearchProject.initiativesRelated',
      many: true,
      ui: { hideCreate: true },
      label: 'Related Research',
    }),
  },
  ui: {
    // hideCreate: true,
    hideDelete: true,
    listView: {
      initialColumns: ['name'],
    },
  },
});
export default Initiative;
