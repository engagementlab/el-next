export interface Breadcrumb {
  href: string;
  label: string;
}

export const enum Theme {
  none,
  gunviolence,
  climate,
  incarceration,
}

export const ThemeColors = [
  {
    primary: 'text-yellow border-yellow',
    primaryHex: '#7C4E9F',
    secondary: 'text-teal fill-teal',
    secondaryHex: '#00a494',
  },
  {
    primary: 'text-purple border-purple',
    primaryHex: '#7C4E9F',
    secondary: 'text-teal fill-teal',
    secondaryHex: '#00a494',
  },
  {
    primary: 'text-purple border-purple',
    primaryHex: '#7C4E9F',
    secondary: 'text-yellow fill-yellow',
    secondaryHex: '#F6A536',
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
  none: {
    arrow: '#F6A536',
    secodaryArrow: '#F6A536',
    text: 'text-yellow',
    heading: 'text-green-blue',
    border: 'border-yellow',
    borderLight: 'border-yellowlt',
    bg: 'bg-yellow',
    fill: 'fill-yellow',
    gradient: 'from-[#E2BDFE] to-[#ecd0fe]',
    secodary: 'bg-[#E2BDFE]',
    secodaryBg: 'bg-[#F6A536]/40',
    theme: Theme.none,
  },
  tngv: {
    arrow: '#7C4E9F',
    secodaryArrow: '#00A494',
    text: 'text-purple',
    heading: 'text-green',
    border: 'border-purple',
    borderLight: 'border-[#E3BFFF]',
    bg: 'bg-purple',
    fill: 'fill-purple',
    gradient: 'from-[#E2BDFE] to-[#ecd0fe]',
    secodary: 'bg-green',
    secodaryBg: 'bg-[#E2BDFE]/40',
    theme: Theme.gunviolence,
  },
  tnej: {
    arrow: '#00A494',
    secodaryArrow: '#00A494',
    text: 'text-leaf',
    heading: 'text-yellow',
    border: 'border-yellow',
    borderLight: 'border-leaf',
    bg: 'bg-yellow',
    // bgDivider: 'bg-yellow',
    fill: 'fill-leaf',
    secodary: 'bg-yellow',
    secodaryBg: 'bg-[#D7EFC1]',
    gradient: 'from-[#D7EFC1] to-leaf',
    theme: Theme.climate,
  },
  teal: {
    arrow: '#00A494',
    secodaryArrow: '#00A494',
    text: 'text-teal',
    heading: 'text-yellow',
    border: 'border-teal',
    borderLight: 'border-teal',
    bg: 'bg-teal',
    fill: 'fill-teal',
    secodary: 'bg-#00A494',
    secodaryBg: 'bg-[#D7EFC1]',
    gradient: 'from-[#D7EFC1] to-teal',
    theme: Theme.none,
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
  flags: string[];
  order: number;
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
  order: number;
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
    publicUrl?: string;
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
export type StudioUnion = Studio & StudioProject;

export type News = {
  title: string;
  key: string;
  flags: string[];
  order: number;
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
  source: string;
};
export type Event = {
  name: string;
  key: string;
  flags: string[];
  order: number;
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
  years: string;
  contact: string;

  buttons: any[];
  content: {
    document: any;
  };
  headingText: {
    document: any;
  };
  shortDescription: string;
  thumbnail: {
    publicId: string;
  };
  thumbAltText: string;
  projectLeads: {
    name: string;
    key: string;
    title: string;
    image: {
      publicId: string;
    };
  }[];
  collaborators: {
    name: string;
    key: string;
    url: string;
    logo: {
      publicId: string;
    };
  }[];
  funders: {
    name: string;
    key: string;
    url: string;
    logo: {
      publicId: string;
    };
  }[];
};

export type Publication = {
  title: string;
  citations: any;
  buttons: {
    label: string;
    url: string;
    icon: string;
  }[];
  relatedProject?: {
    key: string;
  };
};

export type Item = News & Event & StudioProject;

type Category = 'core' | 'studentstaff' | 'fellow';
export type Person = {
  name: string;
  key: string;
  title: string;
  secondaryTitle?: string;
  image: {
    publicId: string;
  };
  category?: Category;
  content?: {
    document: any;
  };
};
export const CustomEase = 'ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)]';
export const InitiativeKeyMap: { [key: string]: string } = {
  tngv: 'gunviolence',
  tnej: 'climate',
};
