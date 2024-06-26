import { graphql, list } from '@keystone-6/core';
import {
  checkbox,
  multiselect,
  relationship,
  select,
  text,
  virtual,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { Status } from '../flags';
import { conditional } from '../../../components/field-conditional';
import { groupConditional } from '../../../components/group-conditional';
import { componentBlocks } from '../../../components/component-blocks';

import { CreatedTimestamp, CreateKey } from '../../hooks';

import { PartnersSelect } from './partners';
import { cloudinaryImage } from '../../../components/cloudinary';
import { azureStorageFile } from '../../../components/fields-azure/src';
import { video } from '../../../components/video-field';
import { azConfigCustom } from '../../azure';
import {
  MaybeItemFunction,
  MaybeSessionFunction,
} from '@keystone-6/core/types';

const Conditional: (
  type: string,
  views?: string
) => {
  createView?: {
    fieldMode?: MaybeSessionFunction<'edit' | 'hidden', ListTypeInfo>;
  };
  itemView?: {
    fieldMode?: MaybeItemFunction<'edit' | 'read' | 'hidden', ListTypeInfo>;
    fieldPosition?: MaybeItemFunction<'form' | 'sidebar', ListTypeInfo>;
  };
  listView?: {
    fieldMode?: MaybeSessionFunction<'read' | 'hidden', ListTypeInfo>;
  };
} = (type: string, views?: string) => {
  return {
    createView: {
      fieldMode: 'hidden',
    },
    itemView: {
      fieldMode: async ({ session, context, item }) => {
        const res = await context.query.Semester.findOne({
          where: { id: item.id.toString() },

          query: 'id name type',
        });

        if (!res.type && type === 'current') return 'edit';
        return res.type === type ? 'edit' : 'hidden';
      },
    },
    views: views,
  };
};

const Semester: Lists.Semester = list({
  access: allowAll,
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
      ui: {
        description:
          "This is the label for the semester's button (e.g. Fall 2023 - Documentary).",
      },
    }),
    key: text({
      // isIndexed: 'unique',
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
    studio: relationship({
      ref: 'Studio.semesters',
    }),
    initiatives: multiselect({
      type: 'enum',
      options: [
        { label: 'TNGV', value: 'gunviolence' },
        { label: 'TNEJ', value: 'climate' },
      ],
    }),
    type: select({
      type: 'enum',
      options: [
        { label: 'Current', value: 'current' },
        { label: 'Upcoming', value: 'upcoming' },
      ],
      ui: {
        displayMode: 'segmented-control',
        description: 'Specify if not a past semester.',
        views: './admin/components/custom-select-view',
      },
    }),
    courseNumber: text({
      label: 'Department(s)',
      validation: {
        isRequired: true,
      },
    }),
    instructors: relationship({
      label: 'Professor(s)',
      ref: 'Person.studioInstructors',
      many: true,
      ui: { hideCreate: true },
    }),
    partners: PartnersSelect,
    contact: text({
      label: 'Semester Contact Email',
    }),

    // --- CURRENT SEMESTER ---
    description: text({
      label: 'Semester Description',
      ui: { ...Conditional('current'), displayMode: 'textarea' },
    }),
    slides: relationship({
      ref: 'Slideshow.semesterSlides',
      many: false,
      label: 'Slideshow',
      ui: Conditional('current'),
    }),
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
      ui: Conditional('current', './admin/components/component-blocks'),
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
      ui: Conditional('current', './admin/components/component-blocks'),
      label: 'Impact Beyond the Studio',
      componentBlocks,
    }),
    projects: relationship({
      ref: 'StudioProject.semester',
      many: true,
      ui: Conditional('current'),
    }),
    learningPartners: relationship({
      ref: 'Person.learningPartners',
      many: true,
      ui: Conditional('current'),
    }),
    studioStudents: relationship({
      ref: 'Person.studioStudents',
      many: true,
      ui: Conditional('current'),
    }),
    studioStaff: relationship({
      ref: 'Person.studioStaff',
      many: true,
      ui: Conditional('current'),
    }),
    undergrad: relationship({
      ref: 'Undergraduate.featuredSemesters',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
      },
    }),

    // --- UPCOMING SEMESTER ---
    previewThumbnail: cloudinaryImage({
      label: 'Preview Listing Thumbnail',
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/studios',
      },
      ui: Conditional('upcoming'),
    }),
    previewThumbAltText: text({
      label: 'Preview Thumbnail Alt Text ♿',
      ui: Conditional('upcoming'),
    }),
    previewShortDescription: text({
      label: 'Preview Short Description',
      ui: {
        ...Conditional('upcoming'),
        displayMode: 'textarea',
        description: 'Displays in listing under thumbnail.',
      },
    }),
    previewSummary: document({
      formatting: true,
      ui: Conditional('upcoming', './admin/components/component-blocks'),
      label: 'Preview Summary',
      componentBlocks,
    }),
    previewVideo: video({
      label: 'Preview Video',
      ui: Conditional('upcoming'),
    }),
    captions: azureStorageFile({
      azureStorageConfig: azConfigCustom('captions'),
      label: 'Video Captions File',
      ui: Conditional('upcoming'),
    }),
    previewVideoThumbnail: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/studios',
      },
      ui: Conditional('upcoming'),
    }),

    // Label for CMS use
    internalLabel: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          if (item.initiatives && item.studioId) {
            // Get the studio this semester belongs to
            const studio = await context.db.Studio.findOne({
              where: { id: item.studioId },
            });

            if (studio) {
              // Get/format the name of studio
              const initiativeKeys = item.initiatives as string[];
              const studioNameFormatted =
                studio.name.length > 40
                  ? `${studio.name.substring(0, 40)}...`
                  : studio.name;
              const labelPrefix = `${studioNameFormatted} - ${
                item.name.split(' - ')[0]
              } `;
              if (initiativeKeys.length > 0) {
                const initiativeLabels: string[] = [];
                initiativeKeys.forEach((key) =>
                  initiativeLabels.push(key === 'gunviolence' ? 'TNGV' : 'TNEJ')
                );
                return `${labelPrefix} (${initiativeLabels.join(', ')})`;
              } else return `${labelPrefix} (None)`;
            }
          } else return item.name;
        },
      }),
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
      },
    }),
  },

  ui: {
    listView: {
      initialColumns: ['name', 'studio', 'status'],
    },
    label: 'Studio Semester',
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
});
export default Semester;
