import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import RootStore from './rootStore';

export default class CollectionStore {
  rootStore: RootStore;
  list: Collection[] | null = null;
  status: FetchStatus = 'idle';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  setStatus = (status: FetchStatus) => {
    this.status = status;
  };

  setList = (list: Collection[]) => {
    this.list = list;
  };

  getList = async (): Promise<StoreActionResponse> => {
    try {
      this.setStatus('fetching');

      const response = await axios.get('/api/collections');

      const { status, data } = response;

      if (status !== 200 || !data?.results) {
        this.setStatus('error');

        return {
          status: response?.status || 400,
        };
      }

      this.setList(data.results);
      this.setStatus('success');

      return { status };
    } catch (error) {
      console.warn(error);

      this.setStatus('error');

      return {
        status: 400,
      };
    }
  };

  reset = () => {
    this.list = null;
    this.status = 'idle';
  };
}
