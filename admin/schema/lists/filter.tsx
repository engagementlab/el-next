import {
    list
  } from '@keystone-6/core';
import {
    json,
    relationship,
    select,
    text
} from '@keystone-6/core/fields';
import {
    document
} from '@keystone-6/fields-document';
import {
    Lists
} from '.keystone/types';

const Filter: Lists.Filter = list({
    fields: {
    //   mediaRef: relationship({ ref: 'MediaItem.filters', many: true }),
      name: text({
        validation: {
          isRequired: true
        }
      }),
      type: select({
        type: 'enum',
        options: [
          { label: 'Voice', value: 'voice' },
          { label: 'Media', value: 'media' },
          { label: 'Studio Dept', value: 'dept' },
          { label: 'Year', value: 'yr' },
          
        ],
        validation: { isRequired: true, },
        isIndexed: 'unique',
        ui: { displayMode: 'segmented-control' },
      }),
    }
  });
  export default Filter;