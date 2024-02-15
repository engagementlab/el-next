import { checkbox, multiselect, select } from '@keystone-6/core/fields';

export const Flags = {
  home: checkbox({
    label: 'Featured on Home',
  }),
};

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
