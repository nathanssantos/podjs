import { makeObservable, observable, action } from "mobx";
import { getRoot } from "mobx-easy";

import * as Environment from "../../constants/Environment";


const DEV_MODE = Environment.DEV_MODE.PODCAST_STORE;

export default class PodcastStore {
  currentEpisode = null;

  constructor() {
    makeObservable(this, {
      currentEpisode: observable,

      loadEpisode: action.bound,
    });
  }

  loadEpisode(payload = {}) {
    try {
      const { episode } = payload;

      const foundFavorite = getRoot().UserStore.favorites.find(
        (favorite) =>
          favorite.collectionId ===
          getRoot().CollectionStore.collectionDetail?.collectionId
      );

      if (foundFavorite) {
        getRoot().StorageStore.updateFavorite({
          collection: {
            ...foundFavorite,
            favoriteRating: foundFavorite.favoriteRating + 1,
          },
        });
      }

      this.currentEpisode = episode;

      getRoot().StorageStore.loadFavoriteCollections();

      return true;
    } catch (error) {
      DEV_MODE
        ? console.log(
            `PodcastStore loadEpisode ERROR: ${JSON.stringify(error, null, 2)}`
          )
        : console.log("PodcastStore loadEpisode ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }
}
