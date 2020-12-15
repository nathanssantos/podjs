import axios from 'axios';
import { TopPodcastsInitialState } from './context';
import { GET_TOP_PODCASTS, RESET_TOP_PODCASTS } from './types';

const getTopPodcasts = async () => {
  try {
    const response = await axios.get(
      'https://cors-anywhere.herokuapp.com/https://rss.itunes.apple.com/api/v1/br/podcasts/top-podcasts/all/100/explicit.json',
    );

    if (
      response &&
      response.data &&
      response.data.feed &&
      response.data.feed.results &&
      response.data.feed.results.length
    ) {
      return {
        topPodcasts: response.data.feed.results.map((podcast) => {
          const { artistName, name, artworkUrl100, id } = podcast;

          return {
            author: artistName,
            title: name,
            image: artworkUrl100,
            id,
          };
        }),
      };
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
