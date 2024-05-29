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
import { Status } from '../flags';
import { azureStorageFile } from '../../../components/fields-azure/src';
import { video } from '../../../components/video-field';
import { azConfigCustom } from '../../azure';

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
    ...Status,
    initiative: select({
      type: 'enum',
      options: [
        { label: 'TNGV', value: 'gunviolence' },
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
    shortDescription: text({
      validation: {
        isRequired: true,
      },
      ui: { description: 'Displays in project listing under thumbnail.' },
    }),
    about: document({
      formatting: true,
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
        views: path.join(process.cwd(), '/admin/components/callToAction.tsx'),
      },
    }),
    ...group({
      label: 'Main Image or Video',
      description:
        "If a trailer image is defined, it will supersede the thumbnail on the project's page.",
      fields: {
        thumbnail: cloudinaryImage({
          label: 'Thumbnail/Header Image',
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
          label: 'Thumbnail/Header Image Alt Text ♿',
          ui: { description: 'Describe appearance of Thumbnail/Header Image' },
        }),
        videoId: text({
          label: 'Video ID',
          ui: {
            description:
              'Vimeo video ID, if applicable. If specified, "Watch the film" button will appear on page',
          },
        }),
        video: video({ label: 'Video' }),
        captions: azureStorageFile({
          azureStorageConfig: azConfigCustom('captions'),
          label: 'Video Captions File',
        }),
        trailerId: text({
          label: 'Trailer video ID',
          ui: { description: 'Vimeo video ID for trailer, if applicable.' },
        }),
        trailerVideo: video({ label: 'Trailer' }),
        trailerCaptions: azureStorageFile({
          azureStorageConfig: azConfigCustom('captions'),
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
          label: 'Trailer Thumbnail Alt Text ♿',
        }),
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
    mdProject: checkbox({
      label: 'Is MD Project',
      defaultValue: false,
      ui: {
        description:
          'Specifies if this project was created as a masters thesis',
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
      initialColumns: ['name', 'initiative', 'status'],
    },
  },
});
export default StudioProject;
