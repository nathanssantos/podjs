import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import type RootStore from './rootStore';
import { normalizeString } from '../utils';

export default class CollectionStore {
  rootStore: RootStore;
  list: Collection[] | null = null;
  topList: Collection[] | null = null;
  listSearchTerm: string = '';
  listSearchCountry: string = '';
  detail: Collection | null = null;
  detailSearchResult: Podcast[] | null = null;
  listStatus: FetchStatus = 'idle';
  topListStatus: FetchStatus = 'idle';
  detailStatus: FetchStatus = 'idle';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

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

  getTopList = async (payload: { country: string }): Promise<StoreActionResponse> => {
    try {
      const { country } = payload;

      if (this.topList?.length && country === this.listSearchCountry) {
        return;
      }

      this.topListStatus = 'fetching';
      this.topList = null;

      const params = {} as { country: string };

      const response = await axios.get('/api/collections/top', {
        params,
      });

      const { status, data } = response as { status: number; data: Collection[] };

      if (status === 200 && !data?.length) {
        this.topListStatus = 'empty';

        return {
          status: status || 400,
        };
      }

      if (status !== 200 || !data) {
        this.topListStatus = 'error';

        return {
          status: status || 400,
        };
      }

      this.topList = data;
      this.topListStatus = 'success';

      return { status };
    } catch (error) {
      console.warn(error);

      this.topListStatus = 'error';

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
    this.detail = null;
    this.detailSearchResult = null;
    this.listStatus = 'idle';
    this.detailStatus = 'idle';
  };
}
