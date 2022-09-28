import {
  list
} from '@keystone-6/core';
import {
  text
} from '@keystone-6/core/fields';
import {
  Lists
} from '.keystone/types';

const DataTemp: Lists.DataTemp = list({
  fields: {
    data: text(),
  },
  ui: {
    isHidden: true,
  }
});
export default DataTemp;