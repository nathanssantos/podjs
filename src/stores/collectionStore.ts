import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';

import { ERROR_STATE } from '../constants/message';
import { normalizeString } from '../utils';
import type RootStore from './rootStore';

export default class CollectionStore {
  rootStore: RootStore;
  list: Collection[] | null = null;
  rank: Collection[] | null = null;
  favorites: Collection[] = [];
  detail: Collection | null = null;
  detailSearchResult: Podcast[] | null = null;
  listStatus: FetchStatus = 'idle';
  rankStatus: FetchStatus = 'idle';
  detailStatus: FetchStatus = 'idle';
  favoritesStatus: FetchStatus = 'idle';
  searchTerm: string = '';
  searchCountry: string = '';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  setDetail = (detail?: Collection): void => {
    this.detail = detail || null;
  };

  setList = (list?: Collection[]): void => {
    this.list = list || null;
  };

  setListStatus = (status?: FetchStatus): void => {
    this.listStatus = status || 'idle';
  };

  setRankStatus = (status?: FetchStatus): void => {
    this.rankStatus = status || 'idle';
  };

  setDetailStatus = (status?: FetchStatus): void => {
    this.detailStatus = status || 'idle';
  };

  setFavoritesStatus = (status?: FetchStatus): void => {
    this.favoritesStatus = status || 'idle';
  };

  setSearchTerm = (term?: string): void => {
    this.searchTerm = term || '';
  };

  setSearchCountry = (country?: string): void => {
    this.searchCountry = country || '';
  };

  setRank = (rank?: Collection[]): void => {
    this.rank = rank || null;
  };

  setFavorites = (favorites?: Collection[]): void => {
    this.favorites = favorites || [];
    this.storeFavorites();
  };

  setDetailSearchResult = (detailSearchResult?: Podcast[]): void => {
    this.detailSearchResult = detailSearchResult || [];
  };

  storeFavorites = (): void => {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  };

  addCollectionToFavorites = (collection: Collection): void => {
    if (!this.favorites?.find(({ collectionId }) => collectionId === collection.collectionId)) {
      this.setFavorites([...this.favorites, collection]);
    }
  };

  removeCollectionFromFavorites = (collection: Collection): void => {
    const newFavorites = this.favorites.filter(
      ({ collectionId }) => collectionId !== collection.collectionId,
    );

    this.setFavorites(newFavorites);
  };

  getList = async (payload: {
    term: string;
    country: string;
  }): Promise<StoreActionResponse> => {
    try {
      const { term, country } = payload;

      if (this.list?.length && term === this.searchTerm && country === this.searchCountry) {
        return;
      }

      this.setListStatus('fetching');
      this.setList();

      const params = {} as { term: string; country: string };

      if (term?.length) {
        this.setSearchTerm(term);
        params.term = term;
      } else {
        this.setSearchTerm();
      }

      if (country?.length) {
        this.setSearchCountry(country);
        params.country = country;
      } else {
        this.setSearchCountry();
      }

      const response = await axios.get('/api/collections', {
        params,
      });

      const { status, data } = response as { status: number; data: Collection[] };

      if (status === 200 && !data?.length) {
        this.setListStatus('empty');

        return {
          status: status || 400,
        };
      }

      if (status !== 200 || !data) {
        this.setListStatus('error');

        return {
          status: status || 400,
        };
      }

      this.setList(data);
      this.setListStatus('success');

      return { status };
    } catch (error) {
      console.warn(error);

      toast.error(ERROR_STATE);

      this.setListStatus('error');

      return {
        status: 400,
      };
    }
  };

  getRank = async (payload: { country: string }): Promise<StoreActionResponse> => {
    try {
      const { country } = payload;

      if (this.rank?.length && country === this.searchCountry) {
        return;
      }

      this.setRankStatus('fetching');
      this.setRank();

      const params = {} as { country: string };

      const response = await axios.get('/api/collections/rank', {
        params,
      });

      const { status, data } = response as { status: number; data: Collection[] };

      if (status === 200 && !data?.length) {
        this.setRankStatus('empty');

        return {
          status: status || 400,
        };
      }

      if (status !== 200 || !data) {
        this.setRankStatus('error');

        return {
          status: status || 400,
        };
      }

      this.setRank(data);
      this.setRankStatus('success');

      return { status };
    } catch (error) {
      console.warn(error);

      toast.error(ERROR_STATE);

      this.setRankStatus('error');

      return {
        status: 400,
      };
    }
  };

  getDetail = async (payload: { id: string | string[] }): Promise<StoreActionResponse> => {
    try {
      this.setDetailStatus('fetching');
      this.setDetail();
      this.setDetailSearchResult();

      const { id } = payload;

      const response = await axios.get(`/api/collections/${id}`);

      const { status, data } = response;

      if (status !== 200 || !data) {
        this.setDetailStatus('error');

        return {
          status: status || 400,
        };
      }

      this.setDetail(data);
      this.setDetailSearchResult(data.items);
      this.setDetailStatus('success');

      return { status };
    } catch (error) {
      console.warn(error);

      toast.error(ERROR_STATE);

      this.setDetailStatus('error');

      return {
        status: 400,
      };
    }
  };

  search = (payload: { term?: string }): void => {
    const { term } = payload;
    this.setDetailSearchResult();

    if (!this.detail?.items) return;

    if (term?.length) {
      this.setDetailSearchResult(
        this.detail.items.filter((item) =>
          normalizeString(item.title.toLowerCase()).includes(
            normalizeString(term.toLowerCase()),
          ),
        ),
      );

      return;
    }

    this.setDetailSearchResult(this.detail.items);
  };

  loadFavoritesData = (): void => {
    this.setFavoritesStatus('fetching');
    const storedFavorites = localStorage.getItem('favorites') || '[]';

    const parsedStoredFavorites: Collection[] = JSON.parse(storedFavorites);

    if (!Array.isArray(parsedStoredFavorites)) {
      this.setFavoritesStatus('error');
      return;
    }

    if (!parsedStoredFavorites.length) {
      this.setFavoritesStatus('empty');
      return;
    }

    this.setFavorites(parsedStoredFavorites);
    this.setFavoritesStatus('success');
  };

  reset = (): void => {
    this.setList();
    this.setRank();
    this.setDetail();
    this.setDetailSearchResult();
    this.setListStatus();
    this.setDetailStatus();
    this.setSearchTerm();
    this.setSearchCountry();
    this.setRankStatus();
  };
}
