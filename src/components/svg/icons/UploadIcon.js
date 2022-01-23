import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const UploadIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 16H15V10H19L12 3L5 10H9V16ZM5 18H19V20H5V18Z" fill={color} />
    </svg>
  );
};

UploadIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

UploadIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default UploadIcon;
