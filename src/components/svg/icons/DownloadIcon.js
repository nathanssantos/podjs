import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const DownloadIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" fill={color} />
    </svg>
  );
};

DownloadIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

DownloadIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default DownloadIcon;
