import React from "react";
import PropTypes from "prop-types";

import * as Theme from "../../../constants/Theme";

const CameraIcon = (props) => {
  const { color, size } = props;

  return (
    <svg
      width={size}
      height={size}
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill={color} />
    </svg>
  );
};

CameraIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

CameraIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default CameraIcon;
