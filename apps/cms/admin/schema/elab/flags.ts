import { multiselect, select } from '@keystone-6/core/fields';

export const Flags = multiselect({
  type: 'enum',
  options: [
    { label: 'Featured on Home', value: 'home' },
    { label: 'Featured in Section', value: 'section' },
  ],
  isFilterable: true,
});

export const Status = {
  status: select({
    type: 'enum',
    options: [
      { label: 'Not Enabled', value: 'disabled' },
      { label: 'Enabled on QA', value: 'testing' },
      { label: 'Enabled Everywhere', value: 'live' },
    ],
    defaultValue: 'disabled',
  }),
};
