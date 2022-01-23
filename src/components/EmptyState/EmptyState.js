import React from "react";
import PropTypes from "prop-types";

import { Text } from "..";

import { EmptyStateSearchIcon } from "../svg";

import * as Theme from "../../constants/Theme";

import "./styles.scss";

const EmptyState = (props) => {
  const { icon, title, description, button } = props;

  const emptyStateClassNames = () => {
    let classNames = "empty-state";
    return classNames;
  };

  return (
    <div className={emptyStateClassNames()}>
      <div className="empty-state__icon">{icon}</div>
      <div className="empty-state__text">
        <Text variant="h5" responsive className="empty-state__title">
          {title}
        </Text>
        <Text
          variant="h6"
          color={Theme.light60}
          responsive
          className="empty-state__description"
        >
          {description}
        </Text>
        <div className="empty-state__button">{button}</div>
      </div>
    </div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.node,
};

EmptyState.defaultProps = {
  icon: <EmptyStateSearchIcon />,
  title: "Nenhum evento foi encontrado.",
  description: "",
  button: null,
};

export default EmptyState;
