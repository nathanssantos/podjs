import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { Container, AppBar } from "@material-ui/core";
import { observer } from "mobx-react";

import { Drawer, Menu } from "..";

import * as Theme from "../../constants/Theme";

import "./styles.scss";

const Header = (props) => {
  const { user } = props;
  const history = useHistory();

  return (
    <AppBar position="fixed" className="header">
      <Container size={Theme.containerMaxWidth}>
        <div className="header__content">
          <div className="header__drawer">
            <Drawer user={user} />
          </div>

          <div onClick={() => history.push("/")} className="header__logo">
            {/* <Logo /> */}
          </div>

          <div className="header__menu">
            <Menu user={user} />
          </div>
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
