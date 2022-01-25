/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Container, AppBar } from "@material-ui/core";
import { observer } from "mobx-react";

import { PlaylistPlay } from "@material-ui/icons";

import { Drawer, Menu, Button } from "..";

import * as Theme from "../../constants/Theme";
import { useStore } from "../../hooks";

import logo from "../../assets/images/logo192.png";

import "./styles.scss";

const Header = (props) => {
  const { user } = props;
  const history = useHistory();
  const store = useStore();

  return (
    <AppBar position="fixed" className="header">
      <Container size={Theme.containerMaxWidth}>
        <div className="header__content">
          <div onClick={() => history.push("/")} className="header__logo">
            <img src={logo} />
          </div>

          {/* <div className="header__menu">
            <Menu user={user} />
          </div>
          <div className="header__drawer">
            <Drawer user={user} />
          </div> */}
          {store.PlayerStore.playlist?.length ? (
            <div className="header__playlist">
              <Button onClick={() => store.PlayerStore.openPlaylist()}>
                <PlaylistPlay />
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </AppBar>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    type: PropTypes.number,
    name: PropTypes.string,
    avatar_url: PropTypes.string,
  }),
};

export default observer(Header);
