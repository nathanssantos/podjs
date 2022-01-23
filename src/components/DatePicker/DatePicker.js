import React from "react";
import PropTypes from "prop-types";
import { KeyboardDatePicker } from "@material-ui/pickers";

import "./styles.scss";

const DatePicker = (props) => {
  const {
    id,
    className,
    value,
    error,
    helperText,
    autoFocus,
    clearable,
    fullWidth,
    disabled,
    onChange,
  } = props;

  const getInputClassNames = () => {
    let newClassNames = "input input--filled date-picker";

    if (className?.length) newClassNames += ` ${className}`;
    return newClassNames;
  };

  return (
    <KeyboardDatePicker
      id={id}
      className={getInputClassNames()}
      InputAdornmentProps={{ position: "end" }}
      inputVariant="filled"
      value={value}
      placeholder="Data"
      onChange={(value) => {
        onChange(value);
      }}
      autoFocus={autoFocus}
      format="dd/MM/yyyy"
      invalidDateMessage="Data inválida"
      minDateMessage="Data inválida"
      maxDateMessage="Data inválida"
      clearLabel="Limpar"
      cancelLabel="Cancelar"
      clearable={clearable}
      fullWidth={fullWidth}
      error={error}
      helperText={helperText}
      disabled={disabled}
    />
  );
};

DatePicker.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.oneOf([null]),
  ]),
  error: PropTypes.bool,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  autoFocus: PropTypes.bool,
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

DatePicker.defaultProps = {
  id: "",
  value: "",
  className: null,
  error: null,
  helperText: null,
  fullWidth: false,
  autoFocus: false,
  clearable: true,
  disabled: false,
  onChange: () => "",
};

export default DatePicker;
