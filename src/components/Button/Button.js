import React from "react";
import PropTypes from "prop-types";
import { Button as MUIButton, LinearProgress } from "@material-ui/core";

import "./styles.scss";

const Button = (props) => {
  const {
    children,
    className,
    type,
    variant,
    size,
    color,
    fullWidth,
    loading,
    progress,
    startIcon,
    endIcon,
    title,
    disabled,
    onClick,
  } = props;

  const buttonClassName = () => {
    let newClassName = "button";

    if (variant) newClassName += ` button--${variant}`;

    if (size) newClassName += ` button--${size}`;

    if (color) newClassName += ` button--${color}`;

    if (loading) newClassName += " button--loading";

    if (className?.length) newClassName += ` ${className}`;

    return newClassName;
  };

  return (
    <MUIButton
      className={buttonClassName()}
      type={type}
      variant={variant}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      title={title}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
      {loading ? (
        <div className="button__loader">
          <LinearProgress
            variant={progress ? "determinate" : "indeterminate"}
            value={progress}
          />
        </div>
      ) : null}
    </MUIButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["text", "contained", "outlined"]),
  size: PropTypes.oneOf(["micro", "small", "medium", "large"]),
  color: PropTypes.oneOf(["primary", "light"]),
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  progress: PropTypes.number,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: "button",
  type: "button",
  variant: "text",
  size: "small",
  color: "primary",
  fullWidth: false,
  loading: false,
  progress: 0,
  startIcon: null,
  endIcon: null,
  title: null,
  disabled: false,
  onClick: () => "",
};

export default Button;
