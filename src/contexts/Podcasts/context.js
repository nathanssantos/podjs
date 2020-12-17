import { createContext } from 'react';

const PodcastsInitialState = {
  topPodcasts: [],
  podcastDetail: {},
  player: {
    playing: null,
  },
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
  playPodcastItem: () => {},
  resetPodcasts: () => {},
});

export { PodcastsInitialState, PodcastsContext, PodcastsActionsContext };
