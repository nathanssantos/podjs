type FetchStatus = 'idle' | 'fetching' | 'error' | 'success';

type StoreActionResponse = {
  status: number;
  data?: any;
  message?: string;
};

type User = {
  id: number;
  name: string;
  email: string;
};

interface Collection {
  artistName: string;
  collectionId: number;
  collectionName: string;
  artworkUrl100: string;
  artworkUrl600: string;
  description?: string;
  genres?: Array;
  feedUrl: string;
}
