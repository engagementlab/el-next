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

import { BlockRenderers } from '@el-next/components';
import { componentBlocks } from '../../../components/component-blocks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { helper, HelperIcon } from '../../../components/helper';
import { Flags } from '../flags';
import { Featuring } from '../featuring';

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
    initiatives: multiselect({
      type: 'enum',
      options: [
        { label: 'Gun Violence', value: 'gunviolence' },
        { label: 'Climate', value: 'climate' },
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
      label: 'Thumbail Alt Text ♿',
      ui: { description: 'Describe appearance of Thumbnail/Header Image' },
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
    source: text({
      ui: {
        description: 'e.g. The Boston Globe, CommonWealth Magazine',
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
      ui: {
        description: 'Appears when item is featured.',
      },
    }),
    body: document({
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
