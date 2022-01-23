import AuthStore from "./AuthStore";
import CollectionStore from "./CollectionStore";
import PlayerStore from "./PlayerStore";

export default class RootStore {
  AuthStore = null;
  CollectionStore = null;
  PlayerStore = null;

  init() {
    this.AuthStore = new AuthStore();
    this.CollectionStore = new CollectionStore();
    this.PlayerStore = new PlayerStore();
  }
}
