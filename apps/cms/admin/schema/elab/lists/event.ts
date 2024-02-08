import { group, list } from '@keystone-6/core';
import {
  checkbox,
  multiselect,
  relationship,
  text,
  timestamp,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

import { componentBlocks } from '../../../components/component-blocks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { Flags, Status } from '../flags';
import { Featuring } from '../featuring';
import { helper, HelperIcon } from '../../../components/helper';
import { Social } from '../social';

const Event: Lists.Event = list({
  access: allowAll,
  fields: {
    name: text({
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
        { label: 'Gun Violence', value: 'gunviolence' },
        { label: 'Climate', value: 'climate' },
        // { label: 'Incarceration', value: 'incarceration' },
      ],
      ui: {
        description: 'If applicable',
      },
    }),
    thumbnail: cloudinaryImage({
      label: 'Thumbnail/Header Image',
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'tngvi/events',
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
    eventDate: timestamp({
      validation: {
        isRequired: true,
      },
    }),
    registrationLink: text(),
    address: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    blurb: document({
      formatting: true,
      ui: {
        description: 'Appears when item is featured.',
      },
    }),
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
        views: './admin/components/component-blocks',
      },

      componentBlocks,
    }),
    ...group(Featuring),
    initiativesWhatsNew: relationship({
      ref: 'Initiative.events',
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
    ...group(Social('Event "Summary" used if not specified')),
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
  ui: {
    listView: {
      initialColumns: ['name', 'eventDate', 'status'],
      initialSort: { field: 'eventDate', direction: 'DESC' },
    },
  },
});
export default Event;
