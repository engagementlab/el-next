import { integer } from '@keystone-6/core/fields';
import { Flags } from './flags';

export const Featuring = {
  label: 'Featuring',
  fields: {
    flags: Flags,
    order: integer({
      defaultValue: 0,
      ui: {
        description:
          'Controls the order of this item on featured section on the homepage.',
      },
    }),
  },
};
