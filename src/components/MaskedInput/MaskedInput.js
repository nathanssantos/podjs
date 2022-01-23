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

const MaskedInput = (props) => {
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
    autoFocus,
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
    onChange: _onChange,
    "aria-describedby": `${id}-helper-text`,
  };

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

MaskedInput.propTypes = {
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
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeText: PropTypes.func,
};

MaskedInput.defaultProps = {
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
  disabled: false,
  fullWidth: false,
  onChange: () => {},
  onChangeText: () => "",
};

export default MaskedInput;
