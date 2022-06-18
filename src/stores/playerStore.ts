import { makeAutoObservable } from 'mobx';
import type RootStore from './rootStore';

export default class PlayerStore {
  rootStore: RootStore;
  currentPodcast: Podcast | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  setCurrentPodcast = (podcast: Podcast) => {
    this.currentPodcast = podcast;
  };
}
