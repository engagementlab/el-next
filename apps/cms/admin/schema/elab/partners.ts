import { multiselect } from '@keystone-6/core/fields';

export const Partners = multiselect({
  type: 'enum',
  options: [
    { label: 'Boston Uncornered', value: 'uncornered' },
    { label: 'Fairmount Indigo CDC Collaborative', value: 'ficdc' },
    { label: 'GreenRoots', value: 'greenroots' },
    { label: 'LDBPI', value: 'ldbpi' },
    { label: 'MGH Center for Gun Violence Prevention', value: 'mgh' },
    {
      label: 'MA Coalition to Prevent Gun Violence',
      value: 'magv',
    },
    { label: 'Speak for the Trees', value: 'sftt' },
    {
      label: 'Southwest Boston Community Development Corporation',
      value: 'swbcdc',
    },
    { label: 'Teen Empowerment', value: 'teenempowerment' },
    { label: 'City of Boston', value: 'boston' },
  ],
});
