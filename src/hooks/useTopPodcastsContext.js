import useContextFactory from './useContextFactory';
import {
  TopPodcastsContext,
  TopPodcastsActionsContext,
} from '../contexts/TopPodcasts/context';

const useTopPodcastsContext = () => {
  const state = useContextFactory('TopPodcasts', TopPodcastsContext);
  const actions = useContextFactory(
    'TopPodcastsActions',
    TopPodcastsActionsContext,
  );

  return [state, actions];
};

export default useTopPodcastsContext;
