import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const ArrowRightIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M10.0001 6L8.59009 7.41L13.1701 12L8.59009 16.59L10.0001 18L16.0001 12L10.0001 6Z"
        fill={color}
      />
    </svg>
  );
};

ArrowRightIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

ArrowRightIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default ArrowRightIcon;
