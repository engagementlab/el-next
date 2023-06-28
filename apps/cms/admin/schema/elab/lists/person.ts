import { list } from '@keystone-6/core';
import { checkbox, relationship, text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { denyAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { cloudinaryImage } from '../../../components/cloudinary';
import { CreatedTimestamp, CreateKey } from '../../hooks';

const Person: Lists.Person = list({
  access: denyAll,
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
    title: text({
      label: 'Title/Role',
      validation: {
        isRequired: true,
      },
    }),
    createdDate: CreatedTimestamp,
    enabled: checkbox({
      defaultValue: true,
    }),
    image: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'elab-home-3.x/people',
      },
      label: 'Bio Image',
    }),
    blurb: text({
      //   label: 'What brings you here?',
      ui: {
        displayMode: 'textarea',
      },
    }),
    content: document({
      formatting: true,
      label: 'Full Bio/Content',
    }),
    mediaItems: relationship({
      ref: 'MediaItem.associatedPeople',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    studios: relationship({
      ref: 'Studio.instructors',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    semesters: relationship({
      ref: 'Semester.associatedPeople',
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
