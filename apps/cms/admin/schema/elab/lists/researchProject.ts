import path from 'path';
import { list, group } from '@keystone-6/core';
import {
  checkbox,
  integer,
  json,
  multiselect,
  relationship,
  select,
  text,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { componentBlocks } from '../../../components/component-blocks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';

import { Flags } from '../flags';

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
    enabled: checkbox({
      defaultValue: true,
    }),
    flags: Flags,
    filters: relationship({
      ref: 'Filter.researchProjects',
      isFilterable: true,
      many: true,
      ui: {
        displayMode: 'select',
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
    initiatives: multiselect({
      label: 'Associated Initiatives',
      type: 'enum',
      options: [
        { label: 'Gun Violence', value: 'gunviolence' },
        { label: 'Climate', value: 'climate' },
        // { label: 'Incarceration', value: 'incarceration' },
      ],
    }),
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
          'If checked, "to Present" will show instead of just the star year.',
      },
    }),
    order: integer({
      defaultValue: 0,
      ui: {
        description:
          'Controls the order of this item on featured section on the homepage.',
      },
    }),
    startYear: integer(),
    endYear: integer(),
    ...group({
      label: 'Images',
      description: 'Project thumbnail and header image',
      fields: {
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
          label: 'Thumbail Alt Text ♿',
          ui: { description: 'Describe appearance of Thumbnail Image' },
        }),
        headingImage: cloudinaryImage({
          cloudinary: {
            cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
            apiKey: `${process.env.CLOUDINARY_KEY}`,
            apiSecret: `${process.env.CLOUDINARY_SECRET}`,
            folder: 'elab-home-v3.x/research/projects',
          },
        }),
        headingImageAltText: text({
          validation: {
            isRequired: true,
          },
          label: 'Heading Image Alt Text ♿',
          ui: { description: 'Describe appearance of Heading Image.' },
        }),
      },
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
    blurb: document({
      links: true,
      ui: {
        description: 'Appears when item is featured.',
      },
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
    tools: json({
      label: 'Project Tools',
      ui: {
        views: path.join(process.cwd(), '/admin/components/tools.tsx'),
      },
    }),
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
});
