import AuthStore from "./AuthStore";
import PodcastStore from "./PodcastStore";

export default class RootStore {
  AuthStore = null;

  init() {
    this.AuthStore = new AuthStore();
    this.PodcastStore = new PodcastStore();
  }
}
