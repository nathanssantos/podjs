/* eslint-disable no-unused-vars */
import { flow, makeObservable, observable } from "mobx";
import { getEnv, getRoot } from "mobx-easy";

import User from "../models/User";

import * as Environment from "../../constants/Environment";
import { maskCEP } from "../../utils";

const DEV_MODE = Environment.DEV_MODE.USER_STORE;

export default class UserStore {
  favorites = [];

  constructor() {
    makeObservable(this, {
      favorites: observable,

      // getUser: flow,
      // register: flow,
      // editProfile: flow,
      // recoverPassword: flow,
      // changePassword: flow,
      // redefinePassword: flow,
      // deleteAccount: flow,
    });
  }

  *getUser() {
    try {
      const response = yield getEnv().baseAPI.get("/me");

      if (DEV_MODE) {
        console.log(
          `UserStore getUser RESPONSE: ${JSON.stringify(response, null, 2)}`
        );
      }

      const { status, data } = response;

      if (status !== 200 || !data) {
        return {
          error: {
            status,
          },
        };
      }

      this.profile = new User(data);

      return true;
    } catch (error) {
      DEV_MODE
        ? console.log(
            `UserStore getUser ERROR: ${JSON.stringify(error, null, 2)}`
          )
        : console.log("UserStore getUser ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }

  *register(payload = {}) {
    try {
      const { type, name, email, password, legal_consent } = payload;

      const response = yield getEnv().baseAPI.post("/users", {
        type: type + 1,
        name,
        email,
        password,
        legal_consent,
      });

      if (DEV_MODE) {
        console.log(
          `UserStore register RESPONSE: ${JSON.stringify(response, null, 2)}`
        );
      }

      const { status } = response;

      if (status !== 200) {
        return {
          error: {
            status,
          },
        };
      }

      return true;
    } catch (error) {
      DEV_MODE
        ? console.log(
            `UserStore register ERROR: ${JSON.stringify(error, null, 2)}`
          )
        : console.log("UserStore register ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }

  *editProfile(payload = {}) {
    try {
      const {
        avatar,
        name,
        phone,
        cpf_cnpj,
        zip,
        street,
        number,
        complement,
        district,
        city,
        state,
      } = payload;

      const formData = new FormData();

      // Profile
      if (name?.length) formData.append("name", name);
      if (avatar instanceof File) formData.append("avatar", avatar);

      formData.append("phone_prefix", phone.substring(0, 2));
      formData.append("phone", phone.substring(2, 11));
      formData.append("cpf_cnpj", cpf_cnpj);

      // Address
      formData.append("address[zip]", maskCEP(zip));
      formData.append("address[street]", street);
      formData.append("address[number]", number);
      formData.append("address[complement]", complement);
      formData.append("address[district]", district);
      formData.append("address[city]", city);
      formData.append("address[state]", state);

      formData.append("_method", "put");

      const response = yield getEnv().baseAPI.post(`/users`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (DEV_MODE) {
        console.log(
          `UserStore editProfile RESPONSE: ${JSON.stringify(response, null, 2)}`
        );
      }

      const { status, data } = response;

      if (status === 400) {
        return {
          error: {
            status,
            message: data.message,
          },
        };
      }

      if (status !== 200 || !data) {
        return {
          error: {
            status,
          },
        };
      }

      this.profile = new User(data);

      return true;
    } catch (error) {
      console.log(error);
      DEV_MODE
        ? console.log(
            `UserStore editProfile ERROR: ${JSON.stringify(error, null, 2)}`
          )
        : console.log("UserStore editProfile ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }

  *recoverPassword(payload = {}) {
    try {
      const { email } = payload;

      const response = yield getEnv().baseAPI.post("/forgot-password", {
        email,
      });

      const { status } = response;

      if (DEV_MODE) {
        console.log(
          `UserStore recoverPassword RESPONSE: ${JSON.stringify(
            response,
            null,
            2
          )}`
        );
      }

      if (status !== 200) {
        return {
          error: {
            status,
          },
        };
      }

      return true;
    } catch (error) {
      DEV_MODE
        ? console.log(
            `UserStore recoverPassword ERROR: ${JSON.stringify(error, null, 2)}`
          )
        : console.log("UserStore recoverPassword ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }

  *changePassword(payload = {}) {
    try {
      const { password, password_confirmation, token, email } = payload;

      const response = yield getEnv().baseAPI.post("/reset-password", {
        password,
        password_confirmation,
        token,
        email,
      });

      const { status } = response;

      if (DEV_MODE) {
        console.log(
          `UserStore changePassword RESPONSE: ${JSON.stringify(
            response,
            null,
            2
          )}`
        );
      }

      if (status !== 200) {
        return {
          error: {
            status,
          },
        };
      }

      return true;
    } catch (error) {
      DEV_MODE
        ? console.log(
            `UserStore changePassword ERROR: ${JSON.stringify(error, null, 2)}`
          )
        : console.log("UserStore changePassword ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }

  *redefinePassword(payload = {}) {
    try {
      const { password } = payload;

      const response = yield getEnv().baseAPI.put("/password", {
        password,
      });

      const { status } = response;

      if (DEV_MODE) {
        console.log(
          `UserStore redefinePassword RESPONSE: ${JSON.stringify(
            response,
            null,
            2
          )}`
        );
      }

      if (status !== 200) {
        return {
          error: {
            status,
          },
        };
      }

      return true;
    } catch (error) {
      DEV_MODE
        ? console.log(
            `UserStore redefinePassword ERROR: ${JSON.stringify(
              error,
              null,
              2
            )}`
          )
        : console.log("UserStore redefinePassword ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }

  *deleteAccount() {
    try {
      const response = yield getEnv().baseAPI.delete("/users");

      const { status } = response;

      if (DEV_MODE) {
        console.log(
          `UserStore deleteAccount RESPONSE: ${JSON.stringify(
            response,
            null,
            2
          )}`
        );
      }

      if (status !== 200) {
        return {
          error: {
            status,
          },
        };
      }

      getRoot().AuthStore.unauthenticate();

      return true;
    } catch (error) {
      DEV_MODE
        ? console.log(
            `UserStore deleteAccount ERROR: ${JSON.stringify(error, null, 2)}`
          )
        : console.log("UserStore deleteAccount ERROR");

      return {
        error: {
          status: error?.response?.status || 400,
        },
      };
    }
  }
}
