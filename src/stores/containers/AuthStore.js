import { action, flow, makeObservable, observable } from "mobx";
import { getEnv, getRoot } from "mobx-easy";

import User from "../models/User";

import { useLocalStorage } from "../../hooks";

import * as Environment from "../../constants/Environment";

const DEV_MODE = Environment.DEV_MODE.AUTH_STORE;

export default class AuthStore {
  status = "unauthenticated";

  constructor() {
    makeObservable(this, {
      status: observable,

      unauthenticate: action.bound,

      authenticate: flow,
      oAuth: flow,
    });
  }

  unauthenticate() {
    this.status = "unauthenticated";

    getRoot().UserStore.profile = null;

    getRoot().CheckoutStore.cart = [];
    getRoot().CheckoutStore.checkoutConfirmation = null;

    getRoot().UploadStore.resetQueue()

    localStorage.removeItem("podjs@token");

    getEnv().baseAPI.defaults.headers.common.Authorization = null;
  }

  *authenticate(payload = {}) {
    try {
      const { type, email, password, storedToken } = payload;

      const [, setStoredToken] = useLocalStorage("token");

      getRoot().CheckoutStore.cart = [];
      getRoot().CheckoutStore.checkoutConfirmation = null;

      if (storedToken?.length) {
        getEnv().baseAPI.defaults.headers.common.Authorization = `Bearer ${storedToken}`;

        yield getRoot().UserStore.getUser();

        if (!getRoot().UserStore.profile?.id) {
          this.unauthenticate();
          return false;
        }

        yield getRoot().ConstantStore.getCities();
        yield getRoot().ConstantStore.getEventCategories();
        yield getRoot().ConstantStore.getBanks();

        this.status = "authenticated";

        return true;
      }

      const response = yield getEnv().baseAPI.post("/auth", {
        type,
        email,
        password,
      });

      if (DEV_MODE) {
        console.log(
          `AuthStore authenticate RESPONSE: ${JSON.stringify(
            response,
            null,
            2
          )}`
        );
      }

      const { status, data } = response;

      if (status !== 200 || !data?.token?.length || !data?.user) {
        this.unauthenticate();

        return {
          error: {
            status,
          },
        };
      }

      const { token, user } = data;

      setStoredToken(token);

      getEnv().baseAPI.defaults.headers.common.Authorization = `Bearer ${token}`;

      getRoot().UserStore.profile = new User(user);

      yield getRoot().ConstantStore.getCities();
      yield getRoot().ConstantStore.getEventCategories();
      yield getRoot().ConstantStore.getBanks();

      this.status = "authenticated";

      return true;
    } catch (error) {
      this.unauthenticate();

      DEV_MODE
        ? console.log(
            `AuthStore authenticate ERROR: ${JSON.stringify(error, null, 2)}`
          )
        : console.log("AuthStore authenticate ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }

  *oAuth(payload = {}) {
    try {
      const { accessToken } = payload;

      const [, setStoredToken] = useLocalStorage("token");

      getRoot().CheckoutStore.cart = [];
      getRoot().CheckoutStore.checkoutConfirmation = null;

      const response = yield getEnv().baseAPI.post(
        `/oauth?token=${accessToken}`
      );

      if (DEV_MODE) {
        console.log(
          `AuthStore oAuth RESPONSE: ${JSON.stringify(response, null, 2)}`
        );
      }

      const { status, data } = response;

      if (status !== 200 || !data?.token?.length || !data?.user) {
        this.unauthenticate();

        return {
          error: {
            status,
          },
        };
      }

      const { token, user } = data;

      setStoredToken(token);

      getEnv().baseAPI.defaults.headers.common.Authorization = `Bearer ${token}`;

      getRoot().UserStore.profile = new User(user);

      yield getRoot().ConstantStore.getCities();
      yield getRoot().ConstantStore.getEventCategories();
      yield getRoot().ConstantStore.getBanks();

      this.status = "authenticated";

      return true;
    } catch (error) {
      this.unauthenticate();

      DEV_MODE
        ? console.log(
            `AuthStore oAuth ERROR: ${JSON.stringify(error, null, 2)}`
          )
        : console.log("AuthStore oAuth ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }
}
