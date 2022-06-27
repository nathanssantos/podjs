import { makeAutoObservable } from 'mobx';

import type RootStore from './rootStore';

export default class UiStore {
  rootStore: RootStore;
  collectionDetailModalIsOpen = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  toggleCollectionModal = ({ open, id }: { open: boolean; id?: string }): void => {
    this.collectionDetailModalIsOpen = open;

    if (id) this.rootStore.collectionStore.getDetail({ id });
  };

  reset = (): void => {
    this.collectionDetailModalIsOpen = false;
  };
}
