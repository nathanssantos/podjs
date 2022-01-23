import AuthStore from "./AuthStore";
import PodcastStore from "./PodcastStore";
import PlayerStore from "./PlayerStore";

export default class RootStore {
  AuthStore = null;
  PodcastStore = null;
  PlayerStore = null;

  init() {
    this.AuthStore = new AuthStore();
    this.PodcastStore = new PodcastStore();
    this.PlayerStore = new PlayerStore();
  }
}
