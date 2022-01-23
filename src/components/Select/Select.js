import React from "react";
import PropTypes from "prop-types";
import {
  Select as MUISelect,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@material-ui/core";

import "./styles.scss";

const Select = (props) => {
  const {
    id,
    className,
    options,
    value,
    label,
    placeholder,
    variant,
    size,
    helperText,
    error,
    fullWidth,
    disabled,
    onChange,
  } = props;

  const getSelectClassNames = () => {
    let newClassNames = "select";
    if (variant) newClassNames += ` select--${variant}`;
    if (size) newClassNames += ` select--${size}`;
    if (placeholder && !value?.length) newClassNames += ` select--placeholder`;
    if (error) newClassNames += ` select--error`;
    if (className?.length) newClassNames += ` ${className}`;
    return newClassNames;
  };

  const formHelperText = helperText ? (
    <FormHelperText id={`${id}-helper-text`}>{helperText}</FormHelperText>
  ) : null;

  const _onChange = (event) => {
    onChange({ ...event, target: { ...event.target, id } });
  };

  const selectProps = {
    id,
    value,
    onChange: _onChange,
    "aria-describedby": `${id}-helper-text`,
    displayEmpty: !!placeholder,
  };

  const inputLabel = label ? (
    <InputLabel htmlFor={id}>{label}</InputLabel>
  ) : null;

  const renderSelect = () => {
    switch (variant) {
      default: {
        return (
          <MUISelect {...selectProps}>
            {placeholder?.length && !label?.length ? (
              <MenuItem key="placeholder" value="" className="placeholder">
                {placeholder}
              </MenuItem>
            ) : null}
            {options?.length
              ? options.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))
              : null}
          </MUISelect>
        );
      }
    }
  };

  return (
    <FormControl
      variant={variant}
      error={error}
      fullWidth={fullWidth}
      disabled={disabled}
      className={getSelectClassNames()}
    >
      {inputLabel}
      {renderSelect()}
      {formHelperText}
    </FormControl>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    }).isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(["standard", "outlined", "filled"]),
  size: PropTypes.oneOf(["medium", "large"]),
  helperText: PropTypes.string,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  placeholder: null,
  className: null,
  label: null,
  variant: "filled",
  size: "medium",
  startAdornment: null,
  endAdornment: null,
  helperText: null,
  error: false,
  disabled: false,
  fullWidth: false,
};

export default Select;
