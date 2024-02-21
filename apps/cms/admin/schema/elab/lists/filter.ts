import { list } from '@keystone-6/core';
import { checkbox, relationship, select, text } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { CreateKey } from '../../hooks';
import { helper, HelperIcon } from '../../../components/helper';

const Filter: Lists.Filter = list({
  access: allowAll,
  fields: {
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

    helper: helper({
      html: 'Please look at <a href="https://docs.google.com/document/d/1OAjHllntfrr_-godz-ekbNEfs0kxrWGymJHgTlXYYQc/edit" target="_blank">this document</a> for tips on alt text.',
      ui: {
        itemView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
      },
      iconType: HelperIcon.info,
    }),
    studioProjects: relationship({ ref: 'StudioProject.filters', many: true }),
    /* researchProjects: relationship({
      ref: 'ResearchProject.filters',
      many: true,
    }), */
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
