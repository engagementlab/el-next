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
  theme?: Theme;
}

export const Theming: { [key: string]: ThemeConfig } = {
  none: {
    arrow: '#7C4E9F',
    secodaryArrow: '#F6A536',
    text: 'text-yellow',
    heading: 'text-green-blue',
    border: 'border-yellow',
    borderLight: 'border-yellowlt',
    bg: 'bg-yellow',
    fill: 'fill-yellow',
    gradient: 'from-[#E2BDFE] to-[#ecd0fe]',
    secodary: 'bg-[#E2BDFE]',
    secodaryBg: 'bg-[#E2BDFE]/40',
    theme: Theme.none,
  },
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
  teal: {
    arrow: '#00A494',
    secodaryArrow: 'fill-teal',
    text: 'text-teal',
    heading: 'text-yellow',
    border: 'border-teal',
    borderLight: 'border-teal',
    bg: 'bg-teal',
    fill: 'fill-teal',
    secodary: 'bg-#00A494',
    secodaryBg: 'bg-[#D7EFC1]',
    gradient: 'from-[#D7EFC1] to-teal',
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

export type Studio = {
  name: string;
  key: string;
  initiatives: string[];
  shortDescription: string;
  thumbnail: {
    publicId: string;
  };
  thumbAltText: string;
};
export type StudioProject = {
  name: string;
  key: string;
  flags: string[];
  initiative: string;
  blurb: { document: any };

  about: {
    document: any;
  };

  filters: {
    key: string;
    name: string;
  }[];
  trailerId: string;
  videoId: string;
  buttons: any[];
  semester: {
    name: string;
  };

  partners: string[];
  coCreation: {
    document: any;
  };
  impact: {
    document: any;
  };
  shortDescription: string;
  thumbnail: {
    publicId: string;
  };
  thumbAltText: string;
  trailerThumbnail: {
    publicUrl: string;
  };
  trailerThumbAltText: string;
  instructors: {
    name: string;
    key: string;
    title: string;
    image: {
      publicId: string;
    };
  }[];
  learningPartners: {
    name: string;
    key: string;
    title: string;
    image: {
      publicId: string;
    };
  }[];
  studioStudents: {
    name: string;
    key: string;
    title: string;
    image: {
      publicId: string;
    };
  }[];
  studioStaff: {
    name: string;
    key: string;
    title: string;
    image: {
      publicId: string;
    };
  }[];
};
export type News = {
  title: string;
  key: string;
  flags: string[];
  initiatives: string[];
  publishDate: string;
  blurb: { document: any };
  body: any;
  thumbnail: {
    publicId: string;
  };
  thumbAltText: string;
  externalLink?: string;
  summary: string;
};
export type Event = {
  name: string;
  key: string;
  flags: string[];
  initiatives: string[];
  eventDate: string;
  blurb: { document: any };
  registrationLink?: string;
  address?: string;
  content?: any;
  thumbnail: {
    publicId: string;
  };
  thumbAltText: string;
  summary: string;
};
export type ResearchProject = {
  name: string;
  type: string;
  key: string;
  partners: string[];
  content: {
    document: any;
  };
  shortDescription: string;
  thumbnail: {
    publicId: string;
  };
  thumbnailAltText: string;
};

export type Item = News & Event;
