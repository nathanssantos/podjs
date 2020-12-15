import axios from 'axios';
import { TopPodcastsInitialState } from './context';
import { GET_TOP_PODCASTS, RESET_TOP_PODCASTS } from './types';

const getTopPodcasts = async () => {
  try {
    const response = await axios.get(
      'https://rss.itunes.apple.com/api/v1/br/podcasts/top-podcasts/all/100/explicit.json',
      { crossdomain: true },
    );

    if (response) {
      console.log(response);
    }

    return {};
  } catch (error) {
    console.log(`TopPocasts getTopPodcasts() error`);
    console.log(error);
    return {};
  }
};

const resetTopPocasts = async () => ({
  ...TopPodcastsInitialState,
});

const dispatch = async (action) => {
  const { type /* payload */ } = action;

  try {
    switch (type) {
      case GET_TOP_PODCASTS: {
        return await getTopPodcasts();
      }

      case RESET_TOP_PODCASTS: {
        return await resetTopPocasts();
      }

      default: {
        console.log(`Action "${type}" doesn't exist on Top Podcasts Context.`);
        break;
      }
    }
  } catch (error) {
    console.log(`Top Podcasts Context dispatch() error.`);
    console.log(error);
  }

  return null;
};

export default dispatch;
