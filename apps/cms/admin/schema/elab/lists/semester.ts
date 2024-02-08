import { list } from '@keystone-6/core';
import { checkbox, relationship, select, text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { componentBlocks } from '../../../components/component-blocks';

import { CreatedTimestamp, CreateKey } from '../../hooks';

import { PartnersSelect } from './partners';
import { Status } from '../flags';

const Semester: Lists.Semester = list({
  access: allowAll,
  fields: {
    name: text({
      validation: {
        isRequired: true,
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
    buttonLabel: text({
      ui: { description: "The label for the semester's button." },
    }),
    studio: relationship({
      ref: 'Studio.semesters',
      ui: { hideCreate: true },
    }),
    // order: integer({
    //   label: 'Order on index page',
    // }),
    type: select({
      type: 'enum',
      options: [
        { label: 'Current', value: 'current' },
        { label: 'Upcoming', value: 'upcoming' },
      ],
      ui: {
        displayMode: 'segmented-control',
        description: 'Specify if not a past semester.',
      },
    }),
    courseNumber: text({
      label: 'Department(s)',
      validation: {
        isRequired: true,
      },
    }),
    instructors: relationship({
      ref: 'Person.studioInstructors',
      many: true,
      ui: { hideCreate: true },
    }),
    slides: relationship({
      ref: 'Slideshow.semesterSlides',
      many: false,
      label: 'Slideshow',
    }),
    description: text({
      label: 'Semester Description',
      validation: {
        isRequired: true,
      },
      ui: {
        displayMode: 'textarea',
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
    projects: relationship({
      ref: 'StudioProject.semester',
      many: true,
    }),
    learningPartners: relationship({
      ref: 'Person.learningPartners',
      many: true,
    }),
    studioStudents: relationship({
      ref: 'Person.studioStudents',
      many: true,
    }),
    studioStaff: relationship({
      ref: 'Person.studioStaff',
      many: true,
    }),
    contact: text({
      // validation: {
      //   isRequired: true,
      //   match: {
      //     regex:
      //       /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/gm,
      //     explanation: 'Not a valid email address',
      //   },
      // },
      label: 'Semester Contact Email',
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
