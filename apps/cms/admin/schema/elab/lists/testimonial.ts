import { list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

import { CreatedTimestamp, CreateKey } from '../../hooks';
import { Status } from '../flags';

const Testimonial: Lists.Testimonial = list({
  access: allowAll,
  fields: {
    createdDate: CreatedTimestamp,
    ...Status,
    body: document({
      formatting: true,
    }),
    attribution: text({
      ui: { displayMode: 'textarea' },
    }),
  },
  ui: {
    listView: {
      initialColumns: ['body', 'attribution'],
    },
  },
});
export default Testimonial;
