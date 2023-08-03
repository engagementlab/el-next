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

export const enum Theme {
  none,
  gunviolence,
  climate,
  incarceration,
}
export const ThemeColors = [
  {
    primary: 'text-purple border-purple',
    primaryHex: '#7C4E9F',
    secondary: 'text-teal fill-teal',
    secondaryHex: '#00a494',
  },
  {
    primary: 'text-purple border-purple',
    primaryHex: '#7C4E9F',
    secondary: 'text-green fill-green',
    secondaryHex: '#00a494',
  },
];

export interface ThemeConfig {
  arrow: string;
  secodaryArrow: string;
  text: string;
  heading: string;
  bg: string;
  border: string;
  borderLight: string;
  fill: string;
  gradient: string;
  secodaryBg: string;
  secodary: string;
  theme: Theme;
}

export const Theming: { [key: string]: ThemeConfig } = {
  gunviolence: {
    arrow: '#7C4E9F',
    secodaryArrow: '#00A494',
    text: 'text-purple',
    heading: 'text-green',
    border: 'border-purple',
    borderLight: 'border-[#E3BFFF]',
    bg: 'bg-purple',
    fill: 'fill-purple',
    gradient: 'from-[#E2BDFE] to-[#ecd0fe]',
    secodary: 'bg-[#E2BDFE]',
    secodaryBg: 'bg-[#E2BDFE]/40',
    theme: Theme.gunviolence,
  },
  climate: {
    arrow: '#00A494',
    secodaryArrow: 'fill-green',
    text: 'text-leaf',
    heading: 'text-yellow',
    border: 'border-leaf',
    borderLight: 'border-leaf',
    bg: 'bg-leaf',
    fill: 'fill-leaf',
    secodary: 'bg-#D7EFC1',
    secodaryBg: 'bg-[#D7EFC1]',
    gradient: 'from-[#D7EFC1] to-leaf',
    theme: Theme.climate,
  },
};

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
