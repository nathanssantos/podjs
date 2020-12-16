import { createContext } from 'react';

const PodcastsInitialState = {
  topPodcasts: [],
  podcastDetail: {},
  ui: {
    requesting: false,
    error: false,
  },
};

const PodcastsContext = createContext({
  ...PodcastsInitialState,
});

const PodcastsActionsContext = createContext({
  getTopPodcasts: () => {},
  getPodcastDetail: () => {},
  resetPodcasts: () => {},
});

export { PodcastsInitialState, PodcastsContext, PodcastsActionsContext };
