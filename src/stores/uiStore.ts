import { makeAutoObservable } from 'mobx';

import type RootStore from './rootStore';

export default class UiStore {
  rootStore: RootStore;
  collectionDetailModalIsOpen = false;
  playListIsOpen = false;
  drawerIsOpen = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  openPlayList = (): void => {
    this.playListIsOpen = true;
  };

  closePlayList = (): void => {
    this.playListIsOpen = false;
  };

  openDrawer = (): void => {
    this.drawerIsOpen = true;
  };

  closeDrawer = (): void => {
    this.drawerIsOpen = false;
  };

  toggleCollectionModal = ({ open, id }: { open: boolean; id?: string }): void => {
    this.collectionDetailModalIsOpen = open;

    if (id) this.rootStore.collectionStore.getDetail({ id });
  };

  reset = (): void => {
    this.collectionDetailModalIsOpen = false;
    this.closePlayList();
  };
}
