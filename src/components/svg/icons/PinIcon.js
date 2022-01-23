import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const PinIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.18652 13.6164C9.86368 11.9577 12.6 9.25139 12.6 6.8C12.6 4.14903 10.451 2 7.8 2C5.14903 2 3 4.14903 3 6.8C3 9.2386 5.03088 11.2525 7.22445 13.4277C7.41547 13.6171 7.60774 13.8077 7.8 14C7.92045 13.8795 8.04998 13.7514 8.18652 13.6164ZM7.80002 8.4C8.68367 8.4 9.40002 7.68366 9.40002 6.8C9.40002 5.91635 8.68367 5.2 7.80002 5.2C6.91636 5.2 6.20002 5.91635 6.20002 6.8C6.20002 7.68366 6.91636 8.4 7.80002 8.4Z"
        fill={color}
      />
    </svg>
  );
};

PinIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

PinIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default PinIcon;
