import * as React from 'react';
import { Image } from '@el-next/components';

type Props = {
  // all?: boolean;
  partners: string[];
};
const Partners = ({ partners }: Props): string => {
  const names = [
    { key: 'ldbpi', name: 'Louis D. Brown Peace Institute' },
    { key: 'mgh', name: 'MGH Center for Gun Violence Prevention' },
    {
      key: 'magv',
      name: 'Massachusetts General Hospital Gun Violence Prevention Center',
    },
    { key: 'teenempowerment', name: 'The Center for Teen Empowerment' },
    { key: 'uncornered', name: 'Boston Uncornered' },
    { key: 'ficdc', name: 'Fairmount Indigo CDC Collaborative logo' },
    { key: 'greenroots', name: 'GreenRoots logo' },
    { key: 'sftt', name: 'Speak for the Trees logo' },
    {
      key: 'swboston',
      name: 'Southwest Boston Community Development Corporation logo',
    },
  ];
  return names
    .filter((name) => partners.includes(name.key))
    .map((name) => name.name)
    .join(', ');
};
export default Partners;
