import { makeObservable, observable, action } from "mobx";
import { getRoot } from "mobx-easy";

import * as Environment from "../../constants/Environment";

const DEV_MODE = Environment.DEV_MODE.PLAYER_STORE;

export default class PlayerStore {
  currentEpisode = null;
  playlist = [];
  playlistIsOpen = false;

  constructor() {
    makeObservable(this, {
      currentEpisode: observable,
      playlist: observable,
      playlistIsOpen: observable,

      setPlaylist: action.bound,
      openPlaylist: action.bound,
      closePlaylist: action.bound,
      addEpisodeToPlaylist: action.bound,
      removeEpisodeFromPlaylist: action.bound,
      playNextPlaylistEpisode: action.bound,
      playPreviousPlaylistEpisode: action.bound,
      clearPlaylist: action.bound,
      loadEpisode: action.bound,
    });
  }

  setPlaylist(newPlaylist) {
    this.playlist = newPlaylist;
  }

  openPlaylist() {
    this.playlistIsOpen = true;
  }

  closePlaylist() {
    this.playlistIsOpen = false;
  }

  addEpisodeToPlaylist({ episode }) {
    if (this.playlist.find((item) => item.title === episode.title)) return;
    this.playlist = [...this.playlist, episode];
  }

  removeEpisodeFromPlaylist({ episode }) {
    this.playlist = this.playlist.filter(
      (item) => item.title !== episode.title
    );
  }

  playNextPlaylistEpisode() {
    let continueLoop = true;

    this.playlist.forEach((episode, index) => {
      if (
        continueLoop &&
        index + 1 < this.playlist?.length &&
        episode.title === this.currentEpisode.title
      ) {
        console.log(this.currentEpisode.title);

        this.loadEpisode({ episode: this.playlist[index + 1] });

        continueLoop = false;
      }
    });
  }

  playPreviousPlaylistEpisode() {
    this.playlist.forEach((episode, index) => {
      const previousEpisode = this.playlist[index - 1];

      if (previousEpisode && episode.title === this.currentEpisode.title) {
        this.loadEpisode({ episode: previousEpisode });
      }
    });
  }

  clearPlaylist() {
    this.playlist = [];
  }

  loadEpisode(payload = {}) {
    try {
      const { episode } = payload;

      if (!this.playlist.find((item) => item.title === episode.title)) {
        this.addEpisodeToPlaylist({ episode });
      }

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
            `PlayerStore loadEpisode ERROR: ${JSON.stringify(error, null, 2)}`
          )
        : console.log("PlayerStore loadEpisode ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }
}
