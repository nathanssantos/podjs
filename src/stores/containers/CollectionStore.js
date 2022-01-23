/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { flow, makeObservable, observable } from "mobx";
import RssParser from "rss-parser";
import adapter from "axios-jsonp";

import * as Environment from "../../constants/Environment";
import baseAPI from "../../services/baseAPI";

import Collection from "../models/Collection";
import Episode from "../models/Episode";
import { getRoot } from "mobx-easy";

const DEV_MODE = Environment.DEV_MODE.PODCAST_STORE;

export default class CollectionStore {
  topCollections = [
    new Collection({
      collectionId: 381816509,
      artistName: "Jovem Nerd",
      artworkUrl100:
        "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/24/70/f4/2470f4fb-0157-9b11-9e05-7646f0f8eb0b/mza_15146351891494261154.jpg/100x100bb.jpg",
      artworkUrl600:
        "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/24/70/f4/2470f4fb-0157-9b11-9e05-7646f0f8eb0b/mza_15146351891494261154.jpg/600x600bb.jpg",
      collectionName: "NerdCast",
      episodes: [],
      feedUrl: "https://jovemnerd.com.br/feed-nerdcast/",
      genreIds: ["1324", "26"],
      genres: ["Sociedade e cultura", "Podcasts"],
      primaryGenreName: "Sociedade e cultura",
    }),
    new Collection({
      collectionId: 282567659,
      artistName: "Cinema com Rapadura",
      artworkUrl100:
        "https://is3-ssl.mzstatic.com/image/thumb/Podcasts126/v4/ee/7e/a6/ee7ea62b-e883-4874-457d-5b85e423b49b/mza_534242946008264420.png/100x100bb.jpg",
      artworkUrl600:
        "https://is3-ssl.mzstatic.com/image/thumb/Podcasts126/v4/ee/7e/a6/ee7ea62b-e883-4874-457d-5b85e423b49b/mza_534242946008264420.png/600x600bb.jpg",
      collectionName: "RapaduraCast",
      episodes: [],
      feedUrl: "https://cinemacomrapadura.com.br/rapaduracast/rapaduracast.xml",
      genreIds: ["1309", "26"],
      genres: ["Filme e TV", "Podcasts"],
      primaryGenreName: "Filme e TV",
    }),
    new Collection({
      collectionId: 1133325943,
      artistName: "Alura",
      artworkUrl100:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/03/02/dc/0302dc39-6963-0bc3-2aa0-95dafbf4bf65/mza_5758746539385216897.png/100x100bb.jpg",
      artworkUrl600:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/03/02/dc/0302dc39-6963-0bc3-2aa0-95dafbf4bf65/mza_5758746539385216897.png/600x600bb.jpg",
      collectionName: "Hipsters Ponto Tech",
      episodes: [],
      feedUrl: "https://hipsters.tech/feed/podcast/",
      genreIds: ["1318", "26", "1533"],
      genres: ["Tecnologia", "Podcasts", "Ciência"],
      primaryGenreName: "Tecnologia",
    }),
    new Collection({
      collectionId: 997779431,
      artistName: "devanaestrada.com.br",
      artworkUrl100:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/78/11/25/78112505-3e78-68ed-7f25-ea2baf28a305/mza_7243602696434713583.png/100x100bb.jpg",
      artworkUrl600:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/78/11/25/78112505-3e78-68ed-7f25-ea2baf28a305/mza_7243602696434713583.png/600x600bb.jpg",
      collectionName: "DEVNAESTRADA",
      episodes: [],
      feedUrl: "https://devnaestrada.com.br/feed.xml",
      genreIds: ["1318", "26", "1489", "1528"],
      genres: ["Tecnologia", "Podcasts", "Notícias", "Notícias Tech"],
      primaryGenreName: "Tecnologia",
    }),
  ];
  searchResultList = [];
  collectionDetail = null;

  constructor() {
    makeObservable(this, {
      topCollections: observable,
      searchResultList: observable,
      collectionDetail: observable,

      searchCollectionByTerm: flow,
      getCollectionDetail: flow,
    });
  }

  *searchCollectionByTerm(payload = {}) {
    try {
      const { term } = payload;

      this.collectionDetail = null;

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
