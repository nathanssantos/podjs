/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { SwipeableDrawer } from "@material-ui/core";

import { Menu, Button, Avatar } from "..";

import { MenuIcon } from "../svg";

import * as Theme from "../../constants/Theme";

import "./styles.scss";

const Drawer = (props) => {
  const { user } = props;
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <div className="drawer">
      <Button onClick={open} className="drawer__button">
        <MenuIcon color={Theme.light87} />
      </Button>
      <SwipeableDrawer
        anchor={"left"}
        open={isOpen}
        onClose={close}
        onOpen={open}
      >
        <div className="drawer__content">
          {/* <div className="drawer__user">
            <Avatar image={user?.avatar_url} name={user?.name} />
          </div> */}
          <div className="drawer__menu">
            <Menu vertical drawer={{ close }} user={user} />
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

Drawer.propTypes = {
  user: PropTypes.shape({
    type: PropTypes.number,
    name: PropTypes.string,
    avatar_url: PropTypes.string,
  }),
};

export default Drawer;
