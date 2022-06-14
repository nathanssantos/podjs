import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import RootStore from './rootStore';

export default class CollectionStore {
  rootStore: RootStore;
  list: Collection[] | null = null;
  detail: Collection | null = null;
  listStatus: FetchStatus = 'idle';
  detailStatus: FetchStatus = 'idle';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  getList = async (): Promise<StoreActionResponse> => {
    try {
      this.listStatus = 'fetching';

      const response = await axios.get('/api/collections');

      const { status, data } = response;

      if (status !== 200 || !data?.results) {
        this.listStatus = 'error';

        return {
          status: response?.status || 400,
        };
      }

      this.list = data.results;
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

  getDetail = async (payload: { id: string | string[] }): Promise<StoreActionResponse> => {
    try {
      this.detailStatus = 'fetching';

      const { id } = payload;

      const response = await axios.get(`/api/collections/${id}`);

      const { status, data } = response;

      if (status !== 200 || !data) {
        this.detailStatus = 'error';

        return {
          status: response?.status || 400,
        };
      }

      this.detail = data;
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

  reset = () => {
    this.list = null;
    this.listStatus = 'idle';
  };
}
