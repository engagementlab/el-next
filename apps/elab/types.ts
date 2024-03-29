type Category = 'core' | 'studentstaff' | 'fellow';
type Initiative = 'gunviolence' | 'climate';

export interface Breadcrumb {
  href: string;
  label: string;
}

export interface ThemeConfig {
  arrow: string;
  secodaryArrow: string;
  text: string;
  heading: string;
  bg: string;
  border: string;
  borderLight: string;
  fill: string;
  fillRgb: string;
  gradient: string;
  secodaryBg: string;
  secodary: string;
  theme: Theme;
}

export const enum Theme {
  none,
  gunviolence,
  climate,
  incarceration,
}

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
    fillRgb: 'rgba(246, 165, 54, .6)',
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
    fillRgb: 'rgba(141, 51, 210, .6)',
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
    fill: 'fill-leaf',
    fillRgb: 'rgba(111, 180, 44, .6)',
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
    fillRgb: 'rgba(0, 164, 148, .6)',
    secodary: 'bg-#00A494',
    secodaryBg: 'bg-[#D7EFC1]',
    gradient: 'from-[#D7EFC1] to-teal',
    theme: Theme.none,
  },
};

/* 
  Page item types
*/
export type Event = {
  name: string;
  key: string;
  flags: string[];
  order: number;
  initiatives: Initiative[];
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
  partners: string[];
} & OGParams;
export type News = {
  title: string;
  key: string;
  home: boolean;
  order: number;
  initiatives: Initiative[];
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
} & OGParams;
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
export type ResearchProject = {
  name: string;
  type: string;
  key: string;

  pin?: boolean;
  ongoing?: boolean;
  startYear: number;
  endYear?: number;

  contact?: string;

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
  projectTeam: {
    document: any;
  };
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

  publicationRelated: {
    title: string;
    key: string;
    year: string;
    citations: {
      document: any;
    };
    buttons: any[];
  };
};
export type Studio = {
  name: string;
  key: string;
  flags: string[];
  order: number;
  initiatives: Initiative[];
  shortDescription: string;
  thumbnail: {
    publicId: string;
  };
  thumbAltText: string;
};
export type StudioProject = {
  name: string;
  key: string;
  home: boolean;
  order: number;
  initiative: 'gunviolence' | 'climate';
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
    key: string;
    name: string;
  }[];

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

export type Item = News & Event & StudioProject;
export type Project = ResearchProject & StudioProject;

// Open Graph parameters
export type OGParams = {
  ogImage?: {
    publicId: string;
  };
  ogDescription?: string;
};
export const DefaultOGImageOptions = {
  width: 600,
  transforms: 'f_auto,dpr_auto,c_thumb,g_custom:faces',
};

// This is our default GraphQL where clause;
// - If this is a production build, we want only items that are live
// - If it's not, we also want items that are in test
export const DefaultWhereCondition = (clauseAppendix?: string) => {
  const appendix = clauseAppendix ? `, ${clauseAppendix}` : '';
  const getAll =
    process.env.NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_STAGING === 'true';
  return `where: {
      ${
        getAll
          ? 'OR: [{ status: { equals: live } }, { status: { equals: testing } }]'
          : 'status: { equals: live }'
      }
      ${appendix}
  }`;
};

export const CustomEase = 'ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)]';
export const InitiativeKeyMap: { [key: string]: Initiative } = {
  tngv: 'gunviolence',
  tnej: 'climate',
};
export const InitiativeFilterGroups = [
  {
    key: 'tngv',
    label: 'Transforming Narratives of Gun Violence',
  },
  {
    key: 'tnej',
    label: 'Transforming Narratives for Environmental Justice',
  },
];
