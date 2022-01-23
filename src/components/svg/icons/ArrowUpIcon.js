import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const ArrowUpIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z"
        fill={color}
      />
    </svg>
  );
};

ArrowUpIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

ArrowUpIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default ArrowUpIcon;
