/* eslint-disable react/prop-types */
import React from "react";
import { Container } from "@material-ui/core";

import * as Theme from "../../constants/Theme";

import "./styles.scss";

const Screeen = (props) => {
  const { children = null, className = "", container = true } = props;
  return (
    <div className={`screen ${className}`}>
      {container ? (
        <Container maxWidth={Theme.containerMaxWidth}>{children}</Container>
      ) : (
        children
      )}
    </div>
  );
};

export default Screeen;
