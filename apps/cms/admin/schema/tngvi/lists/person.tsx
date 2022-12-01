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
import { allowAll } from '@keystone-6/core/access';
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
import { helper, HelperIcon } from '../../../components/helper';

const Person: Lists.Person = list({
    access: allowAll,
  fields: {
    docsHelper: helper({
      html: `<b> Links to necessary docs: </b>
              <ul>
                <li>
                  <a
                    href="https://docs.google.com/spreadsheets/d/1-5w_AuwA99uS3jD5CeuTp9yCrzulu-yI8odFn-Vsf7w/edit#gid=1896436944"
                    >Spreadsheet of submitted biographic information
                  </a>
                  <li>
                    <a href="https://drive.google.com/drive/u/1/folders/15Ef9FUiSeU15BiXcNi-QwYwTpQD0NP4GOP8d2FjxQnOTfqaMXeu2mV78TSRRGjrBYD3iZ3qo">
                      Folder of submitted people photos
                    </a>
                  </li>
                </li>
              </ul>`,
      iconType: HelperIcon.info,
      ui: {
        itemView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
      }
    }),
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
      many: true, 
      ui: {
        hideCreate: true,
      }
    }),
    studios: relationship({
      ref: 'Studio.associatedPeople',
      many: true, 
      ui: {
        hideCreate: true,
      }
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