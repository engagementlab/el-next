import path from 'path';
import { graphql, group, list } from '@keystone-6/core';
import { json, relationship, text } from '@keystone-6/core/fields';
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
    intro: document({
      formatting: true,
      links: true,
      ui: {
        views: './admin/components/component-blocks',
      },
      componentBlocks,
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
    partners: json({
      label: 'Partner Descriptions',
      ui: {
        views: path.join(process.cwd(), '/admin/components/partners.tsx'),
      },
    }),
    projectsBlurb: document({
      label: 'Projects Intro Blurb',
      formatting: true,
    }),
    projects: relationship({
      ref: 'StudioProject.initiativesRelated',
      many: true,
      ui: { hideCreate: true },
      label: 'Featured Projects',
    }),
    studiosBlurb: document({
      label: 'Studios Intro Blurb',
      formatting: true,
    }),
    studios: relationship({
      ref: 'Studio.initiativesRelated',
      many: true,
      ui: { hideCreate: true },
      label: 'Featured Studios',
    }),
    research: relationship({
      ref: 'ResearchProject.initiativesRelated',
      many: true,
      ui: { hideCreate: true },
      label: 'Related Research',
    }),
    associatedPeople: relationship({
      ref: 'Person.initiatives',
      many: true,
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'hidden',
        },
      },
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
