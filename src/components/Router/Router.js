import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { observer } from "mobx-react";

import { Header, Playlist } from "..";
import { AudioPlayer } from "..";

import Routes from "../../constants/Routes";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Switch>
        {Routes.map(({ path, component }) => (
          <Route key={path} path={path} component={component} exact />
        ))}
      </Switch>
      <AudioPlayer />
      <Playlist />
    </HashRouter>
  );
};

export default observer(Router);
