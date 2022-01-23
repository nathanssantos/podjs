/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { action, flow, makeObservable, observable } from "mobx";
import RssParser from "rss-parser";
import adapter from "axios-jsonp";

import * as Environment from "../../constants/Environment";
import baseAPI from "../../services/baseAPI";

import Collection from "../models/Collection";
import Episode from "../models/Episode";
import { getRoot } from "mobx-easy";

const DEV_MODE = Environment.DEV_MODE.PODCAST_STORE;

export default class CollectionStore {
  searchTerm = "";
  searchResultList = [];
  collectionDetail = null;

  constructor() {
    makeObservable(this, {
      searchTerm: observable,
      searchResultList: observable,
      collectionDetail: observable,

      clearCollectionDetail: action.bound,

      searchCollectionByTerm: flow,
      getCollectionDetail: flow,
    });
  }

  clearCollectionDetail() {
    this.collectionDetail = null;
  }

  *searchCollectionByTerm(payload = {}) {
    try {
      const { term } = payload;

      this.searchTerm = term;
      
      const response = yield baseAPI.get(
        `${process.env.REACT_APP_PODCAST_API_URL}/search`,
        {
          adapter,
          params: {
            country: "br",
            entity: "podcast",
            media: "podcast",
            term,
          },
        }
      );

      if (DEV_MODE) {
        console.log(
          `CollectionStore searchCollectionByTerm RESPONSE: ${JSON.stringify(
            response,
            null,
            2
          )}`
        );
      }

      const { status, data } = response;

      if (status !== 200 || !data?.results) {
        return {
          error: {
            status,
          },
        };
      }

      this.searchResultList = data.results.map((item) => {
        const favorite = !!getRoot().UserStore.favorites.find(
          (favorite) => favorite.collectionId === item.collectionId
        );

        return new Collection({ ...item, favorite });
      });

      return true;
    } catch (error) {
      DEV_MODE
        ? console.log(
            `CollectionStore searchCollectionByTerm ERROR: ${JSON.stringify(
              error,
              null,
              2
            )}`
          )
        : console.log("CollectionStore searchCollectionByTerm ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }

  *getCollectionDetail(payload = {}) {
    try {
      const { id } = payload;

      const response = yield baseAPI.get(
        `${process.env.REACT_APP_PODCAST_API_URL}/lookup`,
        {
          adapter,
          params: {
            id,
          },
        }
      );

      if (DEV_MODE) {
        console.log(
          `CollectionStore getCollectionDetail RESPONSE: ${JSON.stringify(
            response,
            null,
            2
          )}`
        );
      }

      const { status, data } = response;

      if (
        status !== 200 ||
        !data?.results?.length ||
        !data.results[0]?.feedUrl?.length
      ) {
        return {
          error: {
            status,
          },
        };
      }

      const parser = new RssParser();

      const feed = yield parser.parseURL(data.results[0].feedUrl);

      if (!feed?.items?.length) {
        return {
          error: {
            status: 400,
          },
        };
      }

      const foundFavorite = getRoot().UserStore.favorites.find(
        (favorite) => favorite.collectionId === data.results[0].collectionId
      );

      this.collectionDetail = new Collection({
        ...data.results[0],
        episodes: feed.items.map((item) => new Episode(item)),
        favorite: !!foundFavorite,
        favoriteRating: foundFavorite?.favoriteRating,
      });

      return true;
    } catch (error) {
      DEV_MODE
        ? console.log(
            `CollectionStore getCollectionDetail ERROR: ${JSON.stringify(
              error,
              null,
              2
            )}`
          )
        : console.log("CollectionStore getCollectionDetail ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }
}
