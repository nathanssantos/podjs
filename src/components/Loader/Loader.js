import React from "react";
import { CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";

import * as Theme from "../../constants/Theme";

import "./styles.scss";

const Loader = ({ color, size, paddingVertical }) => (
  <div
    className="loader"
    style={{
      paddingTop: paddingVertical,
      paddingBottom: paddingVertical,
      color,
    }}
  >
    <CircularProgress color="inherit" size={size} />
  </div>
);

Loader.defaultProps = {
  color: Theme.primary,
  size: 20,
  paddingVertical: 4,
};

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  paddingVertical: PropTypes.number,
};

export default Loader;
