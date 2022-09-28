import {
  list
} from '@keystone-6/core';
import {
  text
} from '@keystone-6/core/fields';
import {
  Lists
} from '.keystone/types';

const Temp: Lists.Temp = list({
  fields: {
    data: text(),
  },
  ui: {
    isHidden: true,
  }
});
export default Temp;