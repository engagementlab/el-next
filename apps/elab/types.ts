export interface Breadcrumb {
  href: string;
  label: string;
}
export const enum Partner {
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
