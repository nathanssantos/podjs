import React from "react";
import PropTypes from "prop-types";

import * as Theme from "../../../constants/Theme";

const GridIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M10 18H15V12H10V18ZM4 18H9V5H4V18ZM16 18H21V12H16V18ZM10 5V11H21V5H10Z"
        fill={color}
      />
    </svg>
  );
};

GridIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

GridIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default GridIcon;
