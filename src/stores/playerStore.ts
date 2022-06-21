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

  setCurrentPodcast = (podcast: Podcast | null) => {
    this.currentPodcast = podcast;
  };

  openPlayList = () => {
    this.playListIsOpen = true;
  };

  closePlayList = () => {
    this.playListIsOpen = false;
  };

  setPlayList = (playlist: Podcast[]) => {
    this.playList = playlist;
  };

  addPodcastToPlayList = (podcast: Podcast) => {
    if (!this.playList.find(({ enclosure }) => enclosure.url === podcast?.enclosure?.url)) {
      this.setPlayList([...this.playList, podcast]);
    }
  };

  removePodcastFromPlaylist = (podcast: Podcast) => {
    this.setPlayList(
      this.playList.filter(({ enclosure }) => enclosure.url !== podcast?.enclosure?.url),
    );
  };

  reset = () => {
    this.currentPodcast = null;
    this.playList = [];
    this.playListIsOpen = false;
  };
}
