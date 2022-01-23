import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Checkbox as MUICheckbox, FormControlLabel } from '@material-ui/core';

import './styles.scss';

const Checkbox = (props) => {
  const { defaultChecked, label, disabled, onChange } = props;
  const [checked, setChecked] = useState(false);

  const checkboxClassNames = () => {
    let classNames = 'checkbox';
    return classNames;
  };

  const handleChange = (event) => {
    const value = event.target.checked;
    onChange(value);
    setChecked(value);
  };

  useEffect(() => {
    if (defaultChecked) setChecked(true);
  }, []);

  return (
    <FormControlLabel
      className={checkboxClassNames()}
      control={
        <MUICheckbox
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          color="primary"
        />
      }
      label={label}
    />
  );
};

Checkbox.propTypes = {
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  defaultChecked: false,
  onChange: () => '',
  label: null,
  disabled: false,
};

export default Checkbox;
