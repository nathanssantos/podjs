import { makeAutoObservable } from 'mobx';

import type RootStore from './rootStore';

export default class PlayerStore {
  rootStore: RootStore;
  currentPodcast: Podcast | null = null;
  playList: Podcast[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  setCurrentPodcast = (podcast?: Podcast): void => {
    this.currentPodcast = podcast || null;
    this.storeCurrentPodcast();
  };

  setPlayList = (playlist?: Podcast[]): void => {
    this.playList = playlist || [];
    this.storePlaylist();
  };

  addPodcastToPlayList = (podcast: Podcast): void => {
    if (!this.playList.find(({ enclosure }) => enclosure.url === podcast?.enclosure?.url)) {
      this.setPlayList([...this.playList, podcast]);
    }
  };

  removePodcastFromPlaylist = (podcast: Podcast): void => {
    const newPlaylist = this.playList.filter(
      ({ enclosure }) => enclosure.url !== podcast?.enclosure?.url,
    );

    if (!newPlaylist.length || podcast.enclosure.url === this.currentPodcast?.enclosure.url) {
      this.setCurrentPodcast();

      const audio = document.querySelector('audio');

      if (audio) {
        audio.src = '';
        audio.currentTime = 0;
        audio.pause();
      }
    }

    this.setPlayList(newPlaylist);
  };

  next = (): void => {
    let continueLoop = true;

    this.playList.forEach((podcast, index) => {
      const nextPodcast = this.playList[index + 1];

      if (
        continueLoop &&
        nextPodcast &&
        podcast.enclosure.url === this.currentPodcast?.enclosure.url
      ) {
        this.setCurrentPodcast(nextPodcast);

        continueLoop = false;
      }
    });
  };

  previous = (): void => {
    this.playList.forEach((podcast, index) => {
      const previousPodcast = this.playList[index - 1];

      if (previousPodcast && podcast.enclosure.url === this.currentPodcast?.enclosure.url) {
        this.setCurrentPodcast(previousPodcast);
      }
    });
  };

  storePlaylist = (): void => {
    localStorage.setItem('playList', JSON.stringify(this.playList));
  };

  storeCurrentPodcast = (): void => {
    localStorage.setItem('currentPodcast', JSON.stringify(this.currentPodcast));
  };

  storeCurrentTime = (time: number): void => {
    localStorage.setItem('currentTime', JSON.stringify(time));
  };

  loadPlayerData = (): void => {
    const storedPlayList = localStorage.getItem('playList') || '[]';
    const storedCurrentPodcast = localStorage.getItem('currentPodcast') || 'null';
    const storedCurrentTime = localStorage.getItem('currentTime') || '0';

    const parsedStoredPlayList: Podcast[] = JSON.parse(storedPlayList);
    const parsedStoredCurrentPodcast: Podcast = JSON.parse(storedCurrentPodcast);
    const parsedStoredCurrentTime: number = JSON.parse(storedCurrentTime);

    if (Array.isArray(parsedStoredPlayList) && parsedStoredPlayList.length) {
      this.setPlayList(parsedStoredPlayList);
    }

    if (parsedStoredCurrentPodcast?.enclosure?.url?.length) {
      this.setCurrentPodcast(parsedStoredCurrentPodcast);
    }

    if (parsedStoredCurrentTime) {
      const audio = document.querySelector('audio');
      if (audio) audio.currentTime = parsedStoredCurrentTime;
    }
  };

  reset = (): void => {
    this.setCurrentPodcast();
    this.setPlayList();
  };
}
