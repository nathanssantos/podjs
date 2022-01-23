/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { action, makeObservable, observable } from "mobx";
import { getRoot } from "mobx-easy";

import * as Environment from "../../constants/Environment";

import Collection from "../models/Collection";

import { useLocalStorage } from "../../hooks";

const DEV_MODE = Environment.DEV_MODE.PODCAST_STORE;

export default class StorageStore {
  constructor() {
    makeObservable(this, {
      loadFavoriteCollections: action.bound,
      addCollectionToFavorites: action.bound,
      removeCollectionFromFavorites: action.bound,
    });
  }

  loadFavoriteCollections() {
    try {
      const [storedFavorites] = useLocalStorage("favorites");

      console.log("storedFavorites", storedFavorites);

      if (Array.isArray(storedFavorites)) {
        getRoot().UserStore.favorites = storedFavorites.map(
          (item) => new Collection({ ...item, favorite: true })
        );
      }
      console.log(getRoot().UserStore.favorites);

      return true;
    } catch (error) {
      console.log(error);

      DEV_MODE
        ? console.log(
            `StorageStore loadFavoriteCollections ERROR: ${JSON.stringify(
              error,
              null,
              2
            )}`
          )
        : console.log("StorageStore loadFavoriteCollections ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }

  addCollectionToFavorites(payload = {}) {
    try {
      const { collection } = payload;

      const [storedFavorites, setStoredFavorites] =
        useLocalStorage("favorites");

      let newFavorites = [];

      if (storedFavorites?.length) {
        if (
          storedFavorites.find(
            ({ collectionId }) => collectionId === collection.collectionId
          )
        ) {
          return;
        }
        newFavorites = [...storedFavorites];
      }

      newFavorites = [...newFavorites, { ...collection, episodes: null }];

      setStoredFavorites(newFavorites);

      this.loadFavoriteCollections();

      return true;
    } catch (error) {
      console.log(error);

      DEV_MODE
        ? console.log(
            `StorageStore addCollectionToFavorites ERROR: ${JSON.stringify(
              error,
              null,
              2
            )}`
          )
        : console.log("StorageStore addCollectionToFavorites ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }

  removeCollectionFromFavorites(payload = {}) {
    try {
      const { id } = payload;

      const [storedFavorites, setStoredFavorites] =
        useLocalStorage("favorites");

      setStoredFavorites(
        storedFavorites.filter(({ collectionId }) => collectionId !== id)
      );

      this.loadFavoriteCollections();

      return true;
    } catch (error) {
      DEV_MODE
        ? console.log(
            `StorageStore removeCollectionFromFavorites ERROR: ${JSON.stringify(
              error,
              null,
              2
            )}`
          )
        : console.log("StorageStore removeCollectionFromFavorites ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }
}
