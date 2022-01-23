import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const PencilIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 17.2501V21.0001H6.75L17.81 9.94006L14.06 6.19006L3 17.2501ZM20.71 7.04006C21.1 6.65006 21.1 6.02006 20.71 5.63006L18.37 3.29006C17.98 2.90006 17.35 2.90006 16.96 3.29006L15.13 5.12006L18.88 8.87006L20.71 7.04006Z"
        fill={color}
      />
    </svg>
  );
};

PencilIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

PencilIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default PencilIcon;
