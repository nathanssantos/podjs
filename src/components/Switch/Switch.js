import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch as MUISwitch, FormControlLabel } from '@material-ui/core';

import './styles.scss';

const Switch = (props) => {
  const { defaultChecked, label, disabled, onChange } = props;
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    const value = event.target.checked;
    onChange(value);
    setChecked(value);
  };

  useEffect(() => {
    if (defaultChecked) setChecked(true);
  }, []);

  return (
    <div>
      <FormControlLabel
        className="switch"
        control={
          <MUISwitch
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            color="primary"
          />
        }
        label={label}
        labelPlacement="start"
      />
    </div>
  );
};

Switch.propTypes = {
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

Switch.defaultProps = {
  defaultChecked: false,
  onChange: () => '',
  label: null,
  disabled: false,
};

export default Switch;
