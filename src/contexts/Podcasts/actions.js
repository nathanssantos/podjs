/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import parseRSS from '../../utils/parseRSS';
import { PodcastsInitialState } from './context';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  GET_TOP_PODCASTS,
  GET_PODCAST_DETAIL,
  PLAY_PODCAST_ITEM,
  GET_FAVORITES,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  RESET_PODCASTS,
} from './types';

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
    console.log(`Pocasts getTopPodcasts() error`);
    console.log(error);
    return {};
  }
};

const getPodcastDetail = async (id) => {
  try {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${id}`,
    );

    if (
      response &&
      response.data &&
      response.data.results &&
      response.data.results.length &&
      response.data.results[0].feedUrl &&
      response.data.results[0].feedUrl.length
    ) {
      // console.log(response.data.results[0]);

      const feed = await parseRSS(
        `https://cors-anywhere.herokuapp.com/${response.data.results[0].feedUrl}`,
      );

      // console.log(feed);

      return {
        podcastDetail: { ...response.data.results[0], ...feed },
      };
    }
    return {};
  } catch (error) {
    console.log(`Pocasts getPodcastDetail() error`);
    console.log(error);
    return {};
  }
};

const playPodcastItem = (item) => {
  try {
    if (item) {
      return {
        player: {
          playing: {
            src: item.enclosure.url,
            image: item.itunes.image,
            title: item.title,
          },
        },
      };
    }
    return {};
  } catch (error) {
    console.log(`Pocasts playPodcastItem() error`);
    console.log(error);
    return {};
  }
};

const getFavorites = () => {
  try {
    const [favorites] = useLocalStorage('favorites');

    return { favorites };
  } catch (error) {
    console.log(`Pocasts getFavorites() error`);
    console.log(error);
    return {};
  }
};

const addFavorite = (newFavorite) => {
  try {
    const [favorites, setFavorites] = useLocalStorage('favorites');

    const newFavorites = [...favorites];
    let newFavoriteFound = false;

    favorites.forEach((favorite) => {
      if (favorite.id === newFavorite.id) newFavoriteFound = true;
    });

    if (!newFavoriteFound) newFavorites.push(newFavorite);

    setFavorites(newFavorites);

    return { favorites: newFavorites };
  } catch (error) {
    console.log(`Pocasts addFavorite() error`);
    console.log(error);
    return {};
  }
};

const removeFavorite = (id) => {
  try {
    const [favorites, setFavorites] = useLocalStorage('favorites');

    const newFavorites = favorites.filter((favorite) => favorite.id !== id);

    setFavorites(newFavorites);

    return { favorites: newFavorites };
  } catch (error) {
    console.log(`Pocasts removeFavorite() error`);
    console.log(error);
    return {};
  }
};

const resetTopPocasts = () => ({
  ...PodcastsInitialState,
});

const dispatch = async (action) => {
  const { type, payload } = action;

  try {
    switch (type) {
      case GET_TOP_PODCASTS: {
        return await getTopPodcasts();
      }

      case GET_PODCAST_DETAIL: {
        return await getPodcastDetail(payload);
      }

      case PLAY_PODCAST_ITEM: {
        return playPodcastItem(payload);
      }

      case GET_FAVORITES: {
        return getFavorites();
      }

      case ADD_FAVORITE: {
        return addFavorite(payload);
      }

      case REMOVE_FAVORITE: {
        return removeFavorite(payload);
      }

      case RESET_PODCASTS: {
        return resetTopPocasts();
      }

      default: {
        console.log(`Action "${type}" doesn't exist on Podcasts Context.`);
        break;
      }
    }
  } catch (error) {
    console.log(`Podcasts Context dispatch() error.`);
    console.log(error);
  }

  return null;
};

export default dispatch;
