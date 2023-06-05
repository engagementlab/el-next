import { list } from '@keystone-6/core';
import { checkbox, select, text } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { CreateKey } from '../../hooks';

const Filter: Lists.Filter = list({
  access: allowAll,
  fields: {
    //   mediaRef: relationship({ ref: 'MediaItem.filters', many: true }),
    name: text({
      validation: {
        isRequired: true,
      },
    }),
    key: text({
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
    enabled: checkbox({
      defaultValue: true,
    }),
    // section: select({
    //   type: 'enum',
    //   options: [
    //     { label: 'Media', value: 'media' },
    //     { label: 'Studio', value: 'studio' },
    //   ],
    //   ui: { displayMode: 'segmented-control' },
    // }),
    // order: integer(),
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
          key: CreateKey(resolvedData.name as string),
        };
      }
      return resolvedData;
    },
  },
  ui: {
    listView: {
      initialColumns: ['name'],
    },
  },
});
export default Filter;
