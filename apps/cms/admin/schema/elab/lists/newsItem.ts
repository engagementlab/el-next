import { graphql, group, list } from '@keystone-6/core';
import {
  checkbox,
  multiselect,
  relationship,
  text,
  timestamp,
  virtual,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

import { componentBlocks } from '../../../components/component-blocks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { helper, HelperIcon } from '../../../components/helper';

import { Featuring } from '../featuring';
import { Social } from '../social';
import { Status } from '../flags';
import { StudioPreviews } from '../virtual';

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
    ...Status,
    initiatives: multiselect({
      type: 'enum',
      options: [
        { label: 'TNGV', value: 'gunviolence' },
        { label: 'TNEJ', value: 'climate' },
        // { label: 'Incarceration', value: 'incarceration' },
      ],
      ui: {
        description: 'If applicable.',
      },
    }),
    thumbnail: cloudinaryImage({
      label: 'Thumbnail/Header Image',
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/news',
      },
    }),
    thumbAltText: text({
      validation: {
        isRequired: true,
      },
      label: 'Thumbnail Alt Text ♿',
      ui: { description: 'Describe appearance of Thumbnail/Header Image' },
    }),
    slides: relationship({
      ref: 'Slide.newsSlides',
      many: true,
      ui: {
        description: 'If defined, shows on news item instead of thumbnail.',
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
    summary: text({
      ui: { displayMode: 'textarea', description: 'Appears below thumbnail.' },
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
    externalLink: text({
      label: 'External link',
    }),
    blurb: document({
      formatting: true,
      label: 'News Item Intros',
      ui: {
        description: 'Appears when item is featured.',
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
    ...group(Featuring),
    alumni: relationship({
      ref: 'Graduate.alumniSpotlight',
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
    learningPartners: relationship({
      ref: 'LearningPartners.spotlight',
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
    initiativesWhatsNew: relationship({
      ref: 'Initiative.news',
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
    ...group(Social('Item "Summary" used if not specified')),

    studioPreviews: StudioPreviews,
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
      initialColumns: ['title', 'publishDate', 'status'],
      initialSort: { field: 'publishDate', direction: 'DESC' },
    },
  },
});
export default NewsItem;
