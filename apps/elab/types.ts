export interface Breadcrumb {
  href: string;
  label: string;
}
// export enum Partner {
//   all = 'all',
//   ficdc = 'Fairmount Indigo CDC Collaborative',
//   greenroots = 'GreenRoots',
//   ldbpi = 'LDBPI',
//   mgh = 'MGH Center for Gun Violence Prevention',
//   magv = 'MA Coalition to Prevent Gun Violence',
//   sftt = 'Speak for the Trees',
//   swbcdc = 'Southwest Boston Community Development Corporation',
//   teenempowerment = 'Teen Empowerment',
//   uncornered = 'Boston Uncornered',
// }
export enum Partner {
  all,
  ficdc,
  greenroots,
  ldbpi,
  mgh,
  magv,
  sftt,
  swbcdc,
  teenempowerment,
  uncornered,
}
export const enum Theme {
  none,
  gunviolence,
  climate,
  incarceration,
}
export const ThemeColors = [
  {},
  {
    primary: 'text-purple border-purple',
    primaryHex: '#7C4E9F',
    secondary: 'text-green fill-green',
    secondaryHex: '#00a494',
  },
];
