import {
  list
} from '@keystone-6/core';
import {
  checkbox,
  text
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import {
  Lists
} from '.keystone/types';
import {
  cloudinaryImage
} from '../../../components/cloudinary';
import { CreatedTimestamp } from '../../hooks';

const User: Lists.Person = list({
  fields: {
    name: text({
      validation: {
        isRequired: true
      }
    }),
    accessToken: text(),
    createdDate: CreatedTimestamp,
    bioId: text(),
  },
  ui: {
    listView: { 
      initialColumns: ['name', 'accessToken']
    }
  }
});
export default User;