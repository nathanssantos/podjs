import { configure } from 'mobx';
import { createContext } from 'react';

import CollectionStore from './collectionStore';
import PlayerStore from './playerStore';
import UiStore from './uiStore';

class RootStore {
  collectionStore = new CollectionStore(this);
  playerStore = new PlayerStore(this);
  uiStore = new UiStore(this);

  constructor() {
    configure({
      enforceActions: 'never',
    });
  }
}

export const RootStoreContext = createContext({} as RootStore);

export const RootStoreProvider = RootStoreContext.Provider;

export default RootStore;
