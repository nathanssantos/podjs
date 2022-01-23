import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const DropdownIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M7 10L12 15L17 10H7Z" fill={color} />
    </svg>
  );
};

DropdownIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

DropdownIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default DropdownIcon;
