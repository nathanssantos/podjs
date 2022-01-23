import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { Autocomplete as MUIAutocomplete } from "@material-ui/lab";

import "./styles.scss";

const Autocomplete = (props) => {
  const {
    id,
    defaultValue,
    className,
    options,
    placeholder,
    error,
    helperText,
    autoFocus,
    disabled,
    fullWidth,
    disableClearable,
    groupBy,
    onChange,
  } = props;

  const getInputClassNames = () => {
    let newClassNames = "autocomplete";
    if (className?.length) newClassNames += ` ${className}`;
    return newClassNames;
  };

  return (
    <MUIAutocomplete
      id={id}
      className={getInputClassNames()}
      defaultValue={defaultValue}
      disableClearable={disableClearable}
      autoFocus={autoFocus}
      disabled={disabled}
      onChange={(event, value) => {
        onChange(value);
      }}
      options={options}
      groupBy={groupBy}
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, currentOption) =>
        option.value == currentOption.value
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          fullWidth={fullWidth}
          variant="filled"
          error={error}
          helperText={helperText}
          inputProps={{
            ...params.inputProps,
            autoComplete: "off",
          }}
        />
      )}
      autoHighlight
    />
  );
};

Autocomplete.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disableClearable: PropTypes.bool,
  groupBy: PropTypes.func,
  defaultValue: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  error: PropTypes.bool,
  helperText: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func,
};

Autocomplete.defaultProps = {
  defaultValue: null,
  options: [],
  disableClearable: false,
  className: null,
  placeholder: "Localização",
  autoFocus: false,
  groupBy: null,
  error: null,
  helperText: null,
  disabled: false,
  fullWidth: false,
  onChange: () => {},
};

export default Autocomplete;
