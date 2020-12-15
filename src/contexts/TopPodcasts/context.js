import { createContext } from 'react';

const TopPodcastsInitialState = {
  topPodcasts: [],
  ui: {
    requesting: false,
    error: false,
  },
};

const TopPodcastsContext = createContext({
  ...TopPodcastsInitialState,
});

const TopPodcastsActionsContext = createContext({
  getTopPodcasts: () => {},
  resetTopPodcasts: () => {},
});

export {
  TopPodcastsInitialState,
  TopPodcastsContext,
  TopPodcastsActionsContext,
};
