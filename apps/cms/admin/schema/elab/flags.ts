import { multiselect } from '@keystone-6/core/fields';

export const Flags = multiselect({
  type: 'enum',
  options: [
    { label: 'Featured on Home', value: 'home' },
    { label: 'Featured in Section', value: 'section' },
  ],
  isFilterable: true,
});
