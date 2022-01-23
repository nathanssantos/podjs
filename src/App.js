import React, { useEffect, useState } from "react";
import { flowResult } from "mobx";
import { wrapRoot } from "mobx-easy";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// import ptBr from "date-fns/locale/pt-BR";
import { ToastContainer } from "react-toastify";

import RootStore from "./stores/containers/RootStore";

import baseAPI from "./services/baseAPI";

import { RootStoreProvider, useLocalStorage } from "./hooks";

import { AppLoader, Router, ThemeProvider } from "./components";

const App = () => {
  const [rootStore, setRootStore] = useState(null);
  const [requesting, setRequesting] = useState(true);
  const [storedToken] = useLocalStorage("token");

  const init = async () => {
    try {
      console.log("v1.0.0");

      const newRootStore = wrapRoot({
        RootStore,
        env: {
          baseAPI,
        },
      });

      setRootStore(newRootStore);

      baseAPI.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response.status === 401) {
            newRootStore.AuthStore.unauthenticate();
          }
          return error;
        }
      );

      newRootStore.StorageStore.loadFavoriteCollections();

      if (storedToken?.length) {
        await flowResult(newRootStore.AuthStore.authenticate({ storedToken }));
      }
    } catch (error) {
      console.log("App init error", error);
    } finally {
      setRequesting(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (!rootStore || requesting) {
    return (
      <div className="app-loader">
        <AppLoader />
      </div>
    );
  }

  return (
    <div className="app">
      <RootStoreProvider value={rootStore}>
        <ThemeProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Router />
            <ToastContainer position="bottom-right" />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </RootStoreProvider>
    </div>
  );
};

export default App;
