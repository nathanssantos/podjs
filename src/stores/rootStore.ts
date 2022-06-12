import { createContext } from 'react';
import AuthStore from './authStore';

class RootStore {
  authStore = {} as AuthStore;

  constructor() {
    this.authStore = new AuthStore(this);
  }
}

export const RootStoreContext = createContext({} as RootStore);

export const RootStoreProvider = RootStoreContext.Provider;

export default RootStore;
