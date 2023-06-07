import { list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';
import { componentBlocks } from '../../../components/component-blocks';
import { FixButtons } from '../../hooks';

const InitiativesLanding: Lists.InitiativesLanding = list({
  access: allowAll,
  fields: {
    name: text({
      isIndexed: 'unique',
      isFilterable: true,
      defaultValue: 'Initiatives Landing Page',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'read',
        },
      },
    }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
  },
  ui: {
    // hideCreate: true,
    hideDelete: true,
    listView: {
      initialColumns: ['name'],
    },
  },
});
export default InitiativesLanding;
