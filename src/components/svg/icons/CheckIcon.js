import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const CheckIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
        fill={color}
      />
    </svg>
  );
};

CheckIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

CheckIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default CheckIcon;
