import {
  list
} from '@keystone-6/core';
import {
  text
} from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import {
  Lists
} from '.keystone/types';
import { CreatedTimestamp } from '../../hooks';

const User: Lists.Person = list({
  access: allowAll,
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