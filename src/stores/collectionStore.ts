import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import { normalizeString } from '../utils';
import type RootStore from './rootStore';

export default class CollectionStore {
  rootStore: RootStore;
  list: Collection[] | null = null;
  rank: Collection[] | null = null;
  detail: Collection | null = null;
  detailSearchResult: Podcast[] | null = null;
  listStatus: FetchStatus = 'idle';
  rankStatus: FetchStatus = 'idle';
  detailStatus: FetchStatus = 'idle';
  listSearchTerm: string = '';
  listSearchCountry: string = '';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  setListSearchTerm = (term: string) => {
    this.listSearchTerm = term;
  };

  setListSearchCountry = (country: string) => {
    this.listSearchCountry = country;
  };

  setDetail = (payload: Collection | null) => {
    this.detail = payload;
  };

  getList = async (payload: {
    term: string;
    country: string;
  }): Promise<StoreActionResponse> => {
    try {
      const { term, country } = payload;

      if (
        this.list?.length &&
        term === this.listSearchTerm &&
        country === this.listSearchCountry
      ) {
        return;
      }

      this.listStatus = 'fetching';
      this.list = null;

      const params = {} as { term: string; country: string };

      if (term?.length) {
        this.listSearchTerm = term;
        params.term = term;
      } else {
        this.listSearchTerm = '';
      }

      if (country?.length) {
        this.listSearchCountry = country;
        params.country = country;
      } else {
        this.listSearchCountry = '';
      }

      const response = await axios.get('/api/collections', {
        params,
      });

      const { status, data } = response as { status: number; data: Collection[] };

      if (status === 200 && !data?.length) {
        this.listStatus = 'empty';

        return {
          status: status || 400,
        };
      }

      if (status !== 200 || !data) {
        this.listStatus = 'error';

        return {
          status: status || 400,
        };
      }

      this.list = data;
      this.listStatus = 'success';

      return { status };
    } catch (error) {
      console.warn(error);

      this.listStatus = 'error';

      return {
        status: 400,
      };
    }
  };

  getRank = async (payload: { country: string }): Promise<StoreActionResponse> => {
    try {
      const { country } = payload;

      if (this.rank?.length && country === this.listSearchCountry) {
        return;
      }

      this.rankStatus = 'fetching';
      this.rank = null;

      const params = {} as { country: string };

      const response = await axios.get('/api/collections/rank', {
        params,
      });

      const { status, data } = response as { status: number; data: Collection[] };

      if (status === 200 && !data?.length) {
        this.rankStatus = 'empty';

        return {
          status: status || 400,
        };
      }

      if (status !== 200 || !data) {
        this.rankStatus = 'error';

        return {
          status: status || 400,
        };
      }

      this.rank = data;
      this.rankStatus = 'success';

      return { status };
    } catch (error) {
      console.warn(error);

      this.rankStatus = 'error';

      return {
        status: 400,
      };
    }
  };

  getDetail = async (payload: { id: string | string[] }): Promise<StoreActionResponse> => {
    this.detailStatus = 'fetching';
    this.detail = null;
    this.detailSearchResult = null;

    try {
      const { id } = payload;

      const response = await axios.get(`/api/collections/${id}`);

      const { status, data } = response;

      if (status !== 200 || !data) {
        this.detailStatus = 'error';

        return {
          status: status || 400,
        };
      }

      this.detail = data;
      this.detailSearchResult = data.items;
      this.detailStatus = 'success';

      return { status };
    } catch (error) {
      console.warn(error);

      this.detailStatus = 'error';

      return {
        status: 400,
      };
    }
  };

  search = (term?: string): void => {
    this.detailSearchResult = null;

    if (!this.detail?.items) return;

    if (term?.length) {
      this.detailSearchResult = this.detail.items.filter((item) =>
        normalizeString(item.title.toLowerCase()).includes(normalizeString(term.toLowerCase())),
      );

      return;
    }

    this.detailSearchResult = this.detail.items;
  };

  reset = () => {
    this.list = null;
    this.rank = null;
    this.detail = null;
    this.detailSearchResult = null;
    this.listStatus = 'idle';
    this.detailStatus = 'idle';
    this.listSearchTerm = '';
    this.listSearchCountry = '';
  };
}
