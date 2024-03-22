import path from 'path';
import { list, group } from '@keystone-6/core';
import {
  checkbox,
  integer,
  json,
  relationship,
  text,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { componentBlocks } from '../../../components/component-blocks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';

import { Flags, Status } from '../flags';
import { Social } from '../social';
import { Featuring } from '../featuring';

export default list({
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

    /* filters: relationship({
      label: 'Media Type',
      ref: 'Filter.researchProjects',
      isFilterable: true,
      many: true,
      ui: {
        displayMode: 'select',
      },
    }), */
    pin: checkbox({
      label: '"Pin" Project to top',
      ui: {
        description:
          'If checked, project will always appear at top of index page.',
      },
    }),
    ongoing: checkbox({
      label: 'Project is ongoing',
      ui: {
        description:
          'If checked, "to Present" will show instead of just the start year.',
      },
    }),
    startYear: integer(),
    endYear: integer(),
    thumbnail: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/research/projects',
      },
    }),
    thumbAltText: text({
      validation: {
        isRequired: true,
      },
      label: 'Thumbnail Alt Text ♿',
      ui: { description: 'Describe appearance of Thumbnail Image' },
    }),
    headingText: document({
      formatting: true,
      ui: {
        description: 'Text appearing next to heading image.',
      },
    }),
    buttons: json({
      label: 'Call to Action Buttons',
      ui: {
        views: path.join(process.cwd(), '/admin/components/callToAction.tsx'),
      },
    }),
    shortDescription: text({
      ui: { description: 'Displays in project listing under thumbnail.' },
    }),
    content: document({
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
    collaborators: relationship({
      ref: 'Partner.researchProject',
      many: true,
      label: 'Collaborators',
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'logo'],
        inlineCreate: { fields: ['name', 'url', 'logo'] },
        inlineEdit: { fields: ['name', 'url', 'logo'] },
        inlineConnect: true,
      },
    }),
    funders: relationship({
      ref: 'Partner.researchProjectFunders',
      many: true,
      label: 'Funders',
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'logo'],
        inlineCreate: { fields: ['name', 'url', 'logo'] },
        inlineEdit: { fields: ['name', 'url', 'logo'] },
        inlineConnect: true,
      },
    }),
    projectLeads: relationship({
      ref: 'Person.researchLeads',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'title'],
        inlineConnect: true,
      },
    }),
    projectTeam: document({
      formatting: true,
    }),
    contact: text({
      label: 'Contact Email',
    }),
    /* tools: json({
      label: 'Project Tools',
      ui: {
        views: path.join(process.cwd(), '/admin/components/tools.tsx'),
      },
    }), */
    initiativesRelated: relationship({
      ref: 'Initiative.research',
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
    mdProject: checkbox({
      label: 'Is MD Project',
      defaultValue: false,
      ui: {
        description:
          'Specifies if this project was created as a masters thesis',
      },
    }),
    ...group(Featuring),
    publicationRelated: relationship({
      ref: 'Publication.relatedProject',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
    ...group(Social('Uses "Short Description" if not specified')),
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
          key: CreateKey(resolvedData.name as string),
        };
      }
      return resolvedData;
    },
  },
  ui: {
    listView: {
      initialColumns: ['name', 'status'],
    },
  },
});
