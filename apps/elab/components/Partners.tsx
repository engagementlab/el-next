type Props = {
  // all?: boolean;
  partners: string[];
};
const Partners = ({ partners }: Props): string => {
  const names = [
    { key: 'ldbpi', name: 'Louis D. Brown Peace Institute' },
    {
      key: 'mgh',
      name: 'Massachusetts General Hospital Gun Violence Prevention Center',
    },
    {
      key: 'magv',
      name: 'Massachusetts Coalition to Prevent Gun Violence',
    },
    { key: 'teenempowerment', name: 'The Center for Teen Empowerment' },
    { key: 'uncornered', name: 'Boston Uncornered' },
    { key: 'ficdc', name: 'Fairmount Indigo CDC Collaborative' },
    { key: 'greenroots', name: 'GreenRoots' },
    { key: 'sftt', name: 'Speak for the Trees' },
    { key: 'wabt', name: 'We Are Better Together' },
    { key: 'zoone', name: 'Zoo New England' },
    // {
    //   key: 'swboston',
    //   name: 'Southwest Boston Community Development Corporation',
    // },
  ];
  return names
    .filter((name) => partners.includes(name.key))
    .map((name) => name.name)
    .join(', ');
};
export default Partners;
