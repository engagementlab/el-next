import { group, list } from '@keystone-6/core';
import {
  checkbox,
  integer,
  relationship,
  select,
  text,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';
import { Status } from '../flags';

const Person: Lists.Person = list({
  access: allowAll,
  fields: {
    name: text({
      isIndexed: 'unique',
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
    title: text({
      label: 'Title/Role',
    }),
    secondaryTitle: text(),
    image: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-v3.x/people',
      },
      label: 'Bio Image',
    }),
    ...group({
      label: 'People Page',
      fields: {
        category: select({
          type: 'string',
          label: 'People Page Section',
          options: [
            { label: 'Core Team', value: 'core' },
            { label: 'Student Staff', value: 'studentstaff' },
            { label: 'Fellow', value: 'fellow' },
          ],
          ui: {
            description:
              'Specify only for people that will appear on the People page',
          },
        }),
        orderInSection: integer({
          defaultValue: 0,
        }),
      },
    }),
    content: document({
      formatting: true,
      label: 'Full Bio/Content',
    }),
    /*     mediaItems: relationship({
      ref: 'MediaItem.associatedPeople',
      many: true,
      ui: {
        hideCreate: true,
      },
    }), */
    studioInstructors: relationship({
      ref: 'Semester.instructors',
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
      ref: 'Semester.learningPartners',
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
    studioStudents: relationship({
      ref: 'Semester.studioStudents',
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
    studioStaff: relationship({
      ref: 'Semester.studioStaff',
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
    projectStudents: relationship({
      ref: 'StudioProject.studioStudents',
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
    projectPartners: relationship({
      ref: 'StudioProject.learningPartners',
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
    projectInstructors: relationship({
      ref: 'StudioProject.instructors',
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
    projectStaff: relationship({
      ref: 'StudioProject.studioStaff',
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
    researchLeads: relationship({
      ref: 'ResearchProject.projectLeads',
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
    mdStudents: relationship({
      ref: 'Graduate.currentStudents',
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
    initiatives: relationship({
      label: 'Associated Initiatives',
      ref: 'Initiative.associatedPeople',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'title', 'image'],
    },
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
export default Person;
