import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const ArrowDownIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M16.59 8.59009L12 13.1701L7.41 8.59009L6 10.0001L12 16.0001L18 10.0001L16.59 8.59009Z"
        fill={color}
      />
    </svg>
  );
};

ArrowDownIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

ArrowDownIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default ArrowDownIcon;
