import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const CalendarIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M17 12H12V17H17V12ZM16 1V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H18V1H16ZM19 19H5V8H19V19Z"
        fill={color}
      />
    </svg>
  );
};

CalendarIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

CalendarIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default CalendarIcon;
