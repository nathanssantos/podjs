import React from "react";
import PropTypes from "prop-types";

import * as Theme from "../../../constants/Theme";

const PlusIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
        fill={color}
      />
    </svg>
  );
};

PlusIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

PlusIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default PlusIcon;
