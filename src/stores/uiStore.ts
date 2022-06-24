import { makeAutoObservable } from 'mobx';

import type RootStore from './rootStore';

export default class UiStore {
  rootStore: RootStore;
  collectionDetailModalIsOpen = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  toggleCollectionModal = ({ open, id }: { open: boolean; id?: string }) => {
    this.collectionDetailModalIsOpen = open;

    if (id) this.rootStore.collectionStore.getDetail({ id });
  };

  reset = () => {
    this.collectionDetailModalIsOpen = false;
  };
}
