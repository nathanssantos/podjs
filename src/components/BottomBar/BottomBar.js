import React from "react";
import PropTypes from "prop-types";
import { Container, AppBar } from "@material-ui/core";
import { observer } from "mobx-react";

import * as Theme from "../../constants/Theme";
import { useStore } from "../../hooks";

import "./styles.scss";

const BottomBar = (props) => {
  const { children } = props;

  const store = useStore();

  const getBottomBarClassNames = () => {
    let newClassNames = "bottom-bar";

    if (store.UploadStore.queueIsVisible) {
      newClassNames += " bottom-bar--upload-queue-is-visible";
    }

    return newClassNames;
  };

  return (
    <AppBar position="fixed" className={getBottomBarClassNames()}>
      <Container size={Theme.containerMaxWidth}>
        <div className="bottom-bar__content">{children}</div>
      </Container>
    </AppBar>
  );
};

BottomBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default observer(BottomBar);
