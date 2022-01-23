import { makeObservable, observable, action } from "mobx";

import * as Environment from "../../constants/Environment";

const DEV_MODE = Environment.DEV_MODE.PODCAST_STORE;

export default class PodcastStore {
  currentEpisode = null;

  constructor() {
    makeObservable(this, {
      currentEpisode: observable,

      loadEpisode: action.bound,
    });
  }

  loadEpisode(payload = {}) {
    try {
      const { episode } = payload;

      this.currentEpisode = episode;

      console.log(this.currentEpisode);

      return true;
    } catch (error) {
      DEV_MODE
        ? console.log(
            `PodcastStore loadEpisode ERROR: ${JSON.stringify(error, null, 2)}`
          )
        : console.log("PodcastStore loadEpisode ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }
}
