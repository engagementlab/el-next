import { list } from '@keystone-6/core';
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
import { Lists } from '.keystone/types';
import { componentBlocks } from '../../../components/component-blocks';

import { CreatedTimestamp, CreateKey } from '../../hooks';

import { PartnersSelect } from './partners';

const Semester: Lists.Semester = list({
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
        { label: 'upcoming', value: 'upcoming' },
      ],
      ui: {
        displayMode: 'segmented-control',
        description: 'Specify if not a past semester.',
      },
    }),
    courseNumber: text({
      validation: {
        isRequired: true,
      },
    }),
    instructors: relationship({
      ref: 'Person.studioInstructors',
      many: true,
      ui: { hideCreate: true },
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
    // helper: helper({
    //   html: 'Please follow the <a href="https://docs.google.com/document/d/19eTH_wqDlXfsP8ODPz7zruIX2Jj8OH5QKwQUqP1yNNE/edit" target="_blank">Semester Template</a>.',
    //   ui: {
    //     itemView: { fieldMode: 'hidden' },
    //     listView: { fieldMode: 'hidden' },
    //   },
    //   iconType: HelperIcon.info,
    // }),
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
      validation: {
        isRequired: true,
        match: {
          regex:
            /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/gm,
          explanation: 'Not a valid email address',
        },
      },
      label: 'Semester Contact Email',
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name'],
      // initialSort: { field: 'order', direction: 'ASC' },
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
