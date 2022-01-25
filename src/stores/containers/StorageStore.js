/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { action, makeObservable, observable } from "mobx";
import { getRoot } from "mobx-easy";
import _ from "lodash";

import * as Environment from "../../constants/Environment";

import Collection from "../models/Collection";

import { useLocalStorage } from "../../hooks";

const DEV_MODE = Environment.DEV_MODE.STORAGE_STORE;

export default class StorageStore {
  constructor() {
    makeObservable(this, {
      loadFavoriteCollections: action.bound,
      addCollectionToFavorites: action.bound,
      removeCollectionFromFavorites: action.bound,
      updateFavorite: action.bound,
    });
  }

  loadFavoriteCollections() {
    try {
      const [storedFavorites] = useLocalStorage("favorites");

      if (Array.isArray(storedFavorites)) {
        getRoot().UserStore.favorites = storedFavorites.map(
          (item) => new Collection({ ...item, favorite: true })
        );
      }

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

      newFavorites = [
        ...newFavorites,
        { ...collection, episodes: null, favorite: true },
      ];

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

  updateFavorite(payload = {}) {
    try {
      const { collection } = payload;

      const [storedFavorites, setStoredFavorites] =
        useLocalStorage("favorites");

      setStoredFavorites(
        storedFavorites.map((storedCollection) => {
          if (storedCollection.collectionId === collection.collectionId) {
            return { ...storedCollection, ...collection };
          }
          return storedCollection;
        })
      );

      this.loadFavoriteCollections();

      return true;
    } catch (error) {
      console.log(error);
      DEV_MODE
        ? console.log(
            `StorageStore updateFavorite ERROR: ${JSON.stringify(
              error,
              null,
              2
            )}`
          )
        : console.log("StorageStore updateFavorite ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }
}
