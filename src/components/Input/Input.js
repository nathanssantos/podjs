import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Input as MUIInput,
  OutlinedInput as MUIOutlinedInput,
  FilledInput as MUIFilledInput,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import { VisibilityIcon, VisibilityOffIcon } from "../svg";

import {
  CurrencyMask,
  PhoneMask,
  CPFMask,
  CEPMask,
  CreditCardMask,
  MonthYearMask,
  CVVMask,
  NumberMask,
  CNPJMask,
} from "./inputMasks";

import "./styles.scss";

const Input = (props) => {
  const {
    id,
    className,
    value,
    label,
    placeholder,
    variant,
    color,
    secureText,
    labelWidth,
    startAdornment,
    endAdornment,
    helperText,
    error,
    fullWidth,
    mask,
    autoFocus,
    autoComplete,
    disabled,
    onChange,
    onChangeText,
  } = props;
  const [secureValue, setSecureValue] = useState(secureText);

  const getInputClassNames = () => {
    let newClassNames = "input";
    if (variant?.length) newClassNames += ` input--${variant}`;
    if (color?.length) newClassNames += ` input--${color}`;
    if (className?.length) newClassNames += ` ${className}`;
    return newClassNames;
  };

  const toggleShowPassword = () => {
    setSecureValue(!secureValue);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const _onChange = (event) => {
    if (onChange) onChange(event);
    if (onChangeText) onChangeText(event.target.value);
  };

  const type = secureText && secureValue ? "password" : "text";

  const passwordIcon = secureValue ? <VisibilityIcon /> : <VisibilityOffIcon />;

  const passwordButtonAriaLabel = secureValue ? "Hide text" : "Show text";

  const _startAdornment = startAdornment ? (
    <InputAdornment position="start">{startAdornment}</InputAdornment>
  ) : null;

  const _endAdornment = secureText ? (
    <InputAdornment position="end">
      <IconButton
        className="bt-password"
        title={passwordButtonAriaLabel}
        aria-label={passwordButtonAriaLabel}
        onClick={toggleShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
        disableRipple
      >
        {passwordIcon}
      </IconButton>
    </InputAdornment>
  ) : endAdornment ? (
    <InputAdornment position="end">{endAdornment}</InputAdornment>
  ) : null;

  const inputProps = {
    id,
    type,
    value,
    placeholder,
    startAdornment: _startAdornment,
    endAdornment: _endAdornment,
    autoFocus,
    autoComplete,
    onChange: _onChange,
    "aria-describedby": `${id}-helper-text`,
  };

  switch (mask) {
    case "number": {
      inputProps.inputComponent = NumberMask;
      break;
    }

    case "currency": {
      inputProps.inputComponent = CurrencyMask;
      break;
    }

    case "phone": {
      inputProps.inputComponent = PhoneMask;
      break;
    }

    case "cpf": {
      inputProps.inputComponent = CPFMask;
      break;
    }

    case "cnpj": {
      inputProps.inputComponent = CNPJMask;
      break;
    }

    case "cep": {
      inputProps.inputComponent = CEPMask;
      break;
    }

    case "credit-card": {
      inputProps.inputComponent = CreditCardMask;
      break;
    }

    case "month-year": {
      inputProps.inputComponent = MonthYearMask;
      break;
    }

    case "cvv": {
      inputProps.inputComponent = CVVMask;
      break;
    }

    default: {
      break;
    }
  }

  const formHelperText = helperText ? (
    <FormHelperText id={`${id}-helper-text`}>{helperText}</FormHelperText>
  ) : null;

  const inputLabel = label ? (
    <InputLabel htmlFor={id}>{label}</InputLabel>
  ) : null;

  const renderTextField = () => {
    switch (variant) {
      case "outlined": {
        return <MUIOutlinedInput {...inputProps} labelWidth={labelWidth} />;
      }

      case "filled": {
        return <MUIFilledInput {...inputProps} />;
      }

      default: {
        return <MUIInput {...inputProps} />;
      }
    }
  };

  return (
    <FormControl
      className={getInputClassNames()}
      variant={variant}
      error={error}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {inputLabel}
      {renderTextField()}
      {formHelperText}
    </FormControl>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  variant: PropTypes.oneOf(["standard", "outlined", "filled"]),
  color: PropTypes.oneOf(["primary", "light"]),
  secureText: PropTypes.bool,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  labelWidth: PropTypes.number,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  mask: PropTypes.oneOf([
    "number",
    "currency",
    "phone",
    "cpf",
    "cnpj",
    "cep",
    "credit-card",
    "month-year",
    "cvv",
    null,
  ]),
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func,
  onChangeText: PropTypes.func,
};

Input.defaultProps = {
  placeholder: null,
  className: null,
  value: "",
  label: null,
  labelWidth: 0,
  variant: "outlined",
  color: "primary",
  secureText: false,
  startAdornment: null,
  endAdornment: null,
  helperText: null,
  error: false,
  autoFocus: false,
  autoComplete: null,
  fullWidth: false,
  mask: null,
  disabled: false,
  onChange: () => {},
  onChangeText: () => "",
};

export default Input;
