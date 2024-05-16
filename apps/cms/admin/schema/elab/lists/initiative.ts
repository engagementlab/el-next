import path from 'path';
import axios from 'axios';
import { graphql, group, list } from '@keystone-6/core';
import { json, relationship, text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { componentBlocks } from '../../../components';
import { cloudinaryImage } from '../../../components/cloudinary';
import { Social } from '../social';
import { video } from '../../../components/video-field';
import { azureStorageFile } from '../../../components/fields-azure/src';
import { azConfigCustom } from '../../azure';

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
    ...group({
      label: 'Intro Video/Slideshow',
      fields: {
        introVideo: video({ label: 'Intro Video' }),
        captions: azureStorageFile({
          azureStorageConfig: azConfigCustom('captions'),
          label: 'Captions File',
        }),
        video: text({
          label: 'Intro Video ID',
          ui: {
            description:
              'Vimeo video ID. If specified, takes precedence over slideshow',
          },
        }),
        videoThumbnail: cloudinaryImage({
          label: 'Intro Video Thumbnail',
          cloudinary: {
            cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
            apiKey: `${process.env.CLOUDINARY_KEY}`,
            apiSecret: `${process.env.CLOUDINARY_SECRET}`,
            folder: 'elab-home-v3.x/studios/projects',
          },
        }),
        videoCaption: text({
          label: 'Intro Video Caption',
        }),
        slides: relationship({
          ref: 'Slide.initiativeSlides',
          many: true,
          ui: {
            description:
              'A slide can be either an image or video. If you define both, only the image will display. ',
            displayMode: 'cards',
            cardFields: ['image', 'altText', 'caption', 'video', 'order'],
            inlineCreate: {
              fields: ['image', 'altText', 'caption', 'video', 'order'],
            },
            inlineEdit: {
              fields: ['image', 'altText', 'caption', 'video', 'order'],
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
    ...group(Social()),
  },
  ui: {
    hideDelete: true,
    listView: {
      initialColumns: ['name'],
    },
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
      return resolvedData;
    },
  },
});
export default Initiative;
