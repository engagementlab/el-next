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

const DataTemp: Lists.DataTemp = list({
  access: allowAll,
  fields: {
    data: text(),
  },
  ui: {
    isHidden: true,
  }
});
export default DataTemp;