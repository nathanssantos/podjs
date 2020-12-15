/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useState } from 'react';
import {
  TopPodcastsContext,
  TopPodcastsActionsContext,
  TopPodcastsInitialState,
} from './context';
import { GET_TOP_PODCASTS, RESET_TOP_PODCASTS } from './types';
import dispatch from './actions';

const TopPodcastsProvider = ({ children }) => {
  const [state, setState] = useState({ ...TopPodcastsInitialState });

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
        console.log(response);
        setState((prevState) => ({
          ...prevState,
          ...response,
          ui: { error: false, requesting: false }, // SUCCESS
        }));
      }
    } catch (error) {
      console.log(`TopPodcastsProvider - dispatchFactory() ${type} error`);
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
        const response = await dispatchFactory(GET_TOP_PODCASTS);
        return response;
      },
      resetTopPodcasts: async () => {
        await dispatchFactory(RESET_TOP_PODCASTS);
      },
    }),
    [],
  );

  return (
    <TopPodcastsContext.Provider value={state}>
      <TopPodcastsActionsContext.Provider value={actions}>
        {children}
      </TopPodcastsActionsContext.Provider>
    </TopPodcastsContext.Provider>
  );
};

export default TopPodcastsProvider;
