import AuthStore from "./AuthStore";
import UserStore from "./UserStore";
import PlayerStore from "./PlayerStore";
import CollectionStore from "./CollectionStore";
import StorageStore from "./StorageStore";

export default class RootStore {
  AuthStore = null;
  UserStore = null;
  PlayerStore = null;
  CollectionStore = null;
  StorageStore = null;

  init() {
    this.AuthStore = new AuthStore();
    this.UserStore = new UserStore();
    this.PlayerStore = new PlayerStore();
    this.CollectionStore = new CollectionStore();
    this.StorageStore = new StorageStore();
  }
}
