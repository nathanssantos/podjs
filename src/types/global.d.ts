type FetchStatus = 'idle' | 'fetching' | 'error' | 'empty' | 'success';

type StoreActionResponse =
  | {
      status?: number;
      data?: any;
      message?: string;
    }
  | AxiosResponse<any, any>;

type MessageResponse = { message: string };

type User = {
  id: number;
  name: string;
  email: string;
};

type Podcast = {
  title: string;
  link: string;
  isoDate: string;
  enclosure: {
    url: string;
    length: string;
    type: string;
  };
  content: string;
  itunes: {
    summary: string;
    duration: string;
    image: string;
  };
  imageFallback?: string;
};

type Collection = {
  artistName: string;
  collectionId: number;
  collectionName: string;
  artworkUrl100: string;
  artworkUrl600: string;
  description?: string;
  managingEditor: string;
  language: string;
  copyright: string;
  lastBuildDate: string;
  primaryGenreName: string;
  genres: string[];
  feedUrl: string;
  trackCount: number;
  country: string;
  items: Podcast[];
};
