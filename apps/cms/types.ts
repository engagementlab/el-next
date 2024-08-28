/**
 *
 * Developed by Engagement Lab, 2023
 * @author Johnny Richardson
 *
 */
export interface EmbedMetadata {
  [key: string]: {
    title?: string;
    oEmbed?: {
      type: 'photo' | 'video' | 'link' | 'rich';
      width?: number;
      height?: number;
      version?: string;
      title?: string;
      html?: string;
      author_name?: string;
      author_url?: string;
      provider_name?: string;
      provider_url?: string;
      cache_age?: number;
      thumbnails?: [
        {
          url?: string;
          width?: number;
          height?: number;
        }
      ];
    };
    twitter_card?: {
      card: string;
      site?: string;
      creator?: string;
      creator_id?: string;
      title?: string;
      description?: string;
      players?: {
        url: string;
        stream?: string;
        height?: number;
        width?: number;
      }[];
      apps: {
        iphone: {
          id: string;
          name: string;
          url: string;
        };
        ipad: {
          id: string;
          name: string;
          url: string;
        };
        googleplay: {
          id: string;
          name: string;
          url: string;
        };
      };
      images: {
        url: string;
        alt: string;
      }[];
    };
    open_graph?: {
      title: string;
      type: string;
      images?: {
        url: string;
        secure_url?: string;
        type: string;
        width: number;
        height: number;
        alt?: string;
      }[];
      url?: string;
      audio?: {
        url: string;
        secure_url?: string;
        type: string;
      }[];
      description?: string;
      determiner?: string;
      site_name?: string;
      locale: string;
      locale_alt: string;
      videos: {
        url: string;
        stream?: string;
        height?: number;
        width?: number;
        tags?: string[];
      }[];
      article: {
        published_time?: string;
        modified_time?: string;
        expiration_time?: string;
        author?: string;
        section?: string;
        tags?: string[];
      };
    };
  };
}
export type EmbedState = {
  dataError: boolean;
  waiting: boolean;
  editUrl: boolean;
  toggleWaiting: () => void;
};

export type StudioPreview = {
  name: string;
  key: string;
  studio: { name: string; key: string };
};

export type StudioPreviewState = {
  dataError: boolean;
  waiting: boolean;
  data: StudioPreview[];
  selectedSemester: StudioPreview | null;
  toggleWaiting: () => void;
};
