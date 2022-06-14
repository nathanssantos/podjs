import { createContext } from 'react';
import { configure } from 'mobx';
import AuthStore from './authStore';
import CollectionStore from './collectionStore';

class RootStore {
  authStore = {} as AuthStore;
  collectionStore = {} as CollectionStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.collectionStore = new CollectionStore(this);

    configure({
      enforceActions: 'never',
    });
  }
}

export const RootStoreContext = createContext({} as RootStore);

export const RootStoreProvider = RootStoreContext.Provider;

export default RootStore;
