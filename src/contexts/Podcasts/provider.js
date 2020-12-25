/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useState } from 'react';
import {
  PodcastsContext,
  PodcastsActionsContext,
  PodcastsInitialState,
} from './context';
import {
  GET_TOP_PODCASTS,
  GET_PODCAST_DETAIL,
  RESET_PODCASTS,
  PLAY_PODCAST_ITEM,
  GET_FAVORITES,
  REMOVE_FAVORITE,
  SEARCH,
  ADD_FAVORITE,
} from './types';
import dispatch from './actions';

const PodcastsProvider = ({ children }) => {
  const [state, setState] = useState({ ...PodcastsInitialState });

  const dispatchFactory = useCallback(async (type, payload) => {
    try {
      setState(
        (prevState) => ({
          ...prevState,
          ui: { error: false, requesting: true },
        }), // REQUESTING
      );

      const response = await dispatch({ type, payload });

      if (response) {
        setState((prevState) => ({
          ...prevState,
          ...response,
          ui: { error: false, requesting: false }, // SUCCESS
        }));
      }
    } catch (error) {
      console.log(`PodcastsProvider - dispatchFactory() ${type} error`);
      console.log(error);
      setState((prevState) => ({
        ...prevState,
        ui: { error: true, requesting: false }, // ERROR
      }));
    }
  }, []);

  const actions = useMemo(
    () => ({
      getTopPodcasts: async () => {
        await dispatchFactory(GET_TOP_PODCASTS);
      },
      getPodcastDetail: async (payload) => {
        await dispatchFactory(GET_PODCAST_DETAIL, payload);
      },
      playPodcastItem: async (payload) => {
        await dispatchFactory(PLAY_PODCAST_ITEM, payload);
      },
      getFavorites: async () => {
        await dispatchFactory(GET_FAVORITES);
      },
      addFavorite: async (payload) => {
        await dispatchFactory(ADD_FAVORITE, payload);
      },
      removeFavorite: async (payload) => {
        await dispatchFactory(REMOVE_FAVORITE, payload);
      },
      search: async (payload) => {
        await dispatchFactory(SEARCH, payload);
      },
      resetPodcasts: async () => {
        await dispatchFactory(RESET_PODCASTS);
      },
    }),
    [],
  );

  return (
    <PodcastsContext.Provider value={state}>
      <PodcastsActionsContext.Provider value={actions}>
        {children}
      </PodcastsActionsContext.Provider>
    </PodcastsContext.Provider>
  );
};

export default PodcastsProvider;
