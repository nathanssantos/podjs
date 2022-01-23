/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import _ from "lodash";

import { Button } from "..";

import { useStore } from "../../hooks";

import Routes from "../../constants/Routes";

import "./styles.scss";

const Menu = (props) => {
  const { user, drawer } = props;
  const history = useHistory();
  const location = useLocation();
  const store = useStore();

  const handleClick = (path) => {
    history.push(path);
    if (drawer) drawer.close();
  };

  const getMenuStyle = () => ({
    flexDirection: drawer ? "column" : "row",
  });

  const getButtonClassName = (path) => {
    if (path === location?.pathname) return "active";

    const _path = path.replace("/", "");

    return location?.pathname?.includes(_path) && _path.length ? "active" : "";
  };

  const renderMenu = () => {
    return Routes.filter(({ menu, drawer: showInDrawer }) =>
      drawer ? showInDrawer : menu
    ).map(({ path, name }) => (
      <Button
        key={path}
        className={getButtonClassName(path)}
        fullWidth={!!drawer}
        onClick={() => handleClick(path)}
        size="medium"
      >
        {name}
      </Button>
    ));
  };

  return (
    <nav className="menu" style={getMenuStyle()}>
      {renderMenu()}
    </nav>
  );
};

Menu.propTypes = {
  user: PropTypes.shape({
    type: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  }),
  drawer: PropTypes.instanceOf(Object),
};

Menu.defaultProps = {
  drawer: null,
};

export default Menu;
