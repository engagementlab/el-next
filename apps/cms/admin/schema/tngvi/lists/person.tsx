import {
  list
} from '@keystone-6/core';
import {
  checkbox,
  select,
  multiselect,
  text,
  relationship
} from '@keystone-6/core/fields';
import {
  document
} from '@keystone-6/fields-document';
import {
  Lists
} from '.keystone/types';
import {
  cloudinaryImage
} from '../../../components/cloudinary';
import {
  CreatedTimestamp,
  CreateKey
} from '../../hooks';

const Person: Lists.Person = list({
  fields: {
    name: text({
      validation: {
        isRequired: true
      }
    }),
    key: text({
      // isIndexed: 'unique',
      isFilterable: true,
      ui: {
        createView: {
          fieldMode: 'hidden'
        },
        itemView: {
          fieldMode: 'hidden'
        }
      }
    }),
    title: text({
      label: 'Title/Role',
      validation: {
        isRequired: true
      }
    }),
    abbreviatedTitle: text({
      // label: 'Title/Role',
      ui: {
        description: "Used for when this person is listed as a collaborator/co-creator on an item (e.g. partner, student, etc). If not provided, the person's first tag will be used"
      }
    }),
    createdDate: CreatedTimestamp,
    enabled: checkbox({
      defaultValue: true,
    }),
    currentlyActive: checkbox({
      label: 'Current Participant',
      defaultValue: true
    }),
    tag: multiselect({
      label: 'Tags',
      type: 'string',
      options: [{
          label: 'Student',
          value: 'student'
        },
        {
          label: 'Faculty',
          value: 'faculty'
        },
        {
          label: 'Partner',
          value: 'partner'
        },
        {
          label: 'Staff',
          value: 'staff'
        },
      ],
    }),
    image: cloudinaryImage({
      cloudinary: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_SECRET}`,
        folder: 'tngvi/people',
      },
      label: 'Bio Image',
    }),
    blurb: text({
      label: 'What brings you here?',
      ui: {
        displayMode: 'textarea'
      }
    }),
    remembrance: text({
      label: 'In remembrance of...'
    }),
    content: document({
      formatting: true,
      label: 'Full Bio/Content'
    }),
    mediaItems: relationship({
      ref: 'MediaItem.associatedPeople',
      many: true
    }),
    studios: relationship({
      ref: 'Studio.associatedPeople',
      many: true
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'title', 'image']
    }
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
          key: CreateKey(resolvedData.name)
        }

      }
      return resolvedData;
    }
  }
});
export default Person;