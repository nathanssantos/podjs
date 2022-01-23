import { makeObservable, observable } from "mobx";

export default class Collection {
  collectionId = null;

  artistName = null;
  artworkUrl100 = null;
  artworkUrl600 = null;
  collectionName = null;
  episodes = [];
  feedUrl = null;
  genreIds = null;
  genres = null;
  primaryGenreName = null;
  favorite = false;
  favoriteRating = 0;

  constructor(newCollection = {}) {
    makeObservable(this, {
      collectionId: observable,

      artistName: observable,
      artworkUrl100: observable,
      artworkUrl600: observable,
      collectionName: observable,
      episodes: observable,
      feedUrl: observable,
      genreIds: observable,
      genres: observable,
      primaryGenreName: observable,
      favorite: observable,
      favoriteRating: observable,
    });

    const {
      collectionId,

      artistName,
      artworkUrl100,
      artworkUrl600,
      collectionName,
      episodes,
      feedUrl,
      genreIds,
      genres,
      primaryGenreName,
      favorite,
      favoriteRating,
    } = newCollection;

    this.collectionId = collectionId || null;

    this.artistName = artistName || "";
    this.artworkUrl100 = artworkUrl100 || "";
    this.artworkUrl600 = artworkUrl600 || "";
    this.collectionName = collectionName || "";
    this.episodes = episodes || [];
    this.feedUrl = feedUrl || "";
    this.genreIds = genreIds || [];
    this.genres = genres || [];
    this.primaryGenreName = primaryGenreName || "";
    this.favorite = favorite || false;
    this.favoriteRating = favoriteRating || 0;
  }
}
