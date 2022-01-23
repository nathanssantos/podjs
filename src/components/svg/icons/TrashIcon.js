import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const TrashIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
        fill={color}
      />
    </svg>
  );
};

TrashIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

TrashIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default TrashIcon;
