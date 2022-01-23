import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const SearchIcon = (props) => {
  const { color, size } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L18.2543 19.7457C18.6662 20.1569 19.3334 20.1566 19.745 19.745C20.1566 19.3334 20.1569 18.6662 19.7457 18.2543L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
        fill={color}
      />
    </svg>
  );
};

SearchIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

SearchIcon.defaultProps = {
  color: Theme.light60,
  size: 24,
};

export default SearchIcon;
