import path from 'path';
import { group, list } from '@keystone-6/core';
import {
  checkbox,
  json,
  relationship,
  select,
  text,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

import { componentBlocks } from '../../../components/component-blocks';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { PartnersSelect } from './partners';

import { Featuring } from '../featuring';
import { Social } from '../social';

const StudioProject: Lists.StudioProject = list({
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
    initiative: select({
      type: 'enum',
      options: [
        { label: 'Gun Violence', value: 'gunviolence' },
        { label: 'Climate', value: 'climate' },
        // { label: 'Incarceration', value: 'incarceration' },
      ],
      validation: { isRequired: true },
      ui: { displayMode: 'select' },
      defaultValue: 'gunviolence',
    }),
    filters: relationship({
      ref: 'Filter.studioProjects',
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
    thumbnail: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/studios/projects',
      },
    }),
    thumbAltText: text({
      validation: {
        isRequired: true,
      },
      label: 'Thumbail Alt Text ♿',
      ui: { description: 'Describe appearance of Thumbnail/Header Image' },
    }),
    shortDescription: text({
      validation: {
        isRequired: true,
      },
      ui: { description: 'Displays in project listing under thumbnail.' },
    }),
    ...group({
      label: 'Top Section',
      fields: {
        videoId: text({
          label: 'Video ID',
          ui: {
            description:
              'Vimeo video ID, if applicable. If specified, "Watch the film" button will appear on page',
          },
        }),
        trailerId: text({
          label: 'Trailer video ID',
          ui: { description: 'Vimeo video ID for trailer, if applicable.' },
        }),
        trailerThumbnail: cloudinaryImage({
          cloudinary: {
            cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
            apiKey: `${process.env.CLOUDINARY_KEY}`,
            apiSecret: `${process.env.CLOUDINARY_SECRET}`,
            folder: 'elab-home-v3.x/studios/projects',
          },
        }),
        trailerThumbAltText: text({
          label: 'Trailer Thumbail Alt Text ♿',
        }),
        about: document({
          links: true,
          ui: {
            description: 'Appears above Call to Action.',
          },
        }),
        buttons: json({
          label: 'Call to Action Buttons',
          ui: {
            description:
              'These will appear below "Watch the film" button, if applicable.',
            views: path.join(
              process.cwd(),
              '/admin/components/callToAction.tsx'
            ),
          },
        }),
      },
    }),
    blurb: document({
      links: true,
      ui: {
        description: 'Appears when item is featured.',
      },
    }),
    partners: PartnersSelect,
    coCreation: document({
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
      label: 'Co-Creation Process',

      componentBlocks,
    }),
    impact: document({
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
      label: 'Impact Beyond the Studio',
      componentBlocks,
    }),
    learningPartners: relationship({
      ref: 'Person.projectPartners',
      many: true,
    }),
    studioStudents: relationship({
      ref: 'Person.projectStudents',
      many: true,
    }),
    studioStaff: relationship({
      ref: 'Person.projectStaff',
      many: true,
    }),
    instructors: relationship({
      ref: 'Person.projectInstructors',
      many: true,
    }),
    ...group(Featuring),
    semester: relationship({
      ref: 'Semester.projects',
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
    undergrad: relationship({
      ref: 'Undergraduate.projectSpotlight',
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
    grad: relationship({
      ref: 'Graduate.projectSpotlight',
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
    initiativesRelated: relationship({
      ref: 'Initiative.projects',
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
});
export default StudioProject;
