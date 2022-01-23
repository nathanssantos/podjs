import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const ArrowLeftIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
        fill={color}
      />
    </svg>
  );
};

ArrowLeftIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

ArrowLeftIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default ArrowLeftIcon;
