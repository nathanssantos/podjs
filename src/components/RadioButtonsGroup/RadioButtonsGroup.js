import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

import { Text } from "..";

import "./styles.scss";

const RadioButtonsGroup = (props) => {
  const { initialValue, options, onChange } = props;
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
    setValue(newValue);
  };

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, []);

  return (
    <RadioGroup value={value} onChange={handleChange} className="radio-group">
      {options?.length
        ? options.map(({ value, label, description }) => (
            <div key={value}>
              <FormControlLabel
                value={value}
                control={<Radio color="primary" />}
                label={label}
              />
              {description?.length ? (
                <Text variant="body-1" className="radio-group__description">
                  {description}
                </Text>
              ) : null}
            </div>
          ))
        : null}
    </RadioGroup>
  );
};

RadioButtonsGroup.propTypes = {
  initialValue: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func,
};

RadioButtonsGroup.defaultProps = {
  initialValue: null,
  defaultChecked: false,
  onChange: () => "",
};

export default RadioButtonsGroup;
