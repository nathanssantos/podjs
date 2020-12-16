import useContextFactory from './useContextFactory';
import {
  PodcastsContext,
  PodcastsActionsContext,
} from '../contexts/Podcasts/context';

const usePodcastsContext = () => {
  const state = useContextFactory('Podcasts', PodcastsContext);
  const actions = useContextFactory('PodcastsActions', PodcastsActionsContext);

  return [state, actions];
};

export default usePodcastsContext;
