import { makeAutoObservable } from 'mobx';

import type RootStore from './rootStore';

export default class PlayerStore {
  rootStore: RootStore;
  currentPodcast: Podcast | null = null;
  playList: Podcast[] = [];
  playListIsOpen: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  setCurrentPodcast = (podcast: Podcast | null): void => {
    this.currentPodcast = podcast;
  };

  openPlayList = (): void => {
    this.playListIsOpen = true;
  };

  closePlayList = (): void => {
    this.playListIsOpen = false;
  };

  setPlayList = (playlist: Podcast[]): void => {
    this.playList = playlist;
  };

  addPodcastToPlayList = (podcast: Podcast): void => {
    if (!this.playList.find(({ enclosure }) => enclosure.url === podcast?.enclosure?.url)) {
      this.setPlayList([...this.playList, podcast]);
    }
  };

  removePodcastFromPlaylist = (podcast: Podcast): void => {
    this.setPlayList(
      this.playList.filter(({ enclosure }) => enclosure.url !== podcast?.enclosure?.url),
    );
    if (!this.playList.length) this.currentPodcast = null;
  };

  reset = (): void => {
    this.currentPodcast = null;
    this.playList = [];
    this.playListIsOpen = false;
  };
}
