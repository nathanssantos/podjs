import React from "react";
import PropTypes from "prop-types";

import * as Theme from "../../../constants/Theme";

const ListIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 14H8V10H4V14ZM4 19H8V15H4V19ZM4 9H8V5H4V9ZM9 14H21V10H9V14ZM9 19H21V15H9V19ZM9 5V9H21V5H9Z"
        fill={color}
      />
    </svg>
  );
};

ListIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

ListIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default ListIcon;
