import { configure } from 'mobx';
import { createContext } from 'react';

import CollectionStore from './collectionStore';
import PlayerStore from './playerStore';

class RootStore {
  collectionStore = {} as CollectionStore;
  playerStore = {} as PlayerStore;

  constructor() {
    this.collectionStore = new CollectionStore(this);
    this.playerStore = new PlayerStore(this);

    configure({
      enforceActions: 'never',
    });
  }
}

export const RootStoreContext = createContext({} as RootStore);

export const RootStoreProvider = RootStoreContext.Provider;

export default RootStore;
