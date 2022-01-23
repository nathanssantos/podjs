import React from "react";
import PropTypes from "prop-types";

// import * as Theme from '../../constants/Theme';

import "./styles.scss";

const Text = (props) => {
  const { children, variant, color, className, style, responsive } = props;

  const textClassName = () => {
    let newClassName = "text";
    if (variant) newClassName += ` text--${variant}`;
    if (responsive) newClassName += ` responsive`;
    if (className?.length) newClassName += ` ${className}`;
    return newClassName;
  };

  const textStyle = { ...style, color };

  switch (variant) {
    case "h1": {
      return (
        <h1 className={textClassName()} style={textStyle}>
          {children}
        </h1>
      );
    }

    case "h2": {
      return (
        <h2 className={textClassName()} style={textStyle}>
          {children}
        </h2>
      );
    }

    case "h3": {
      return (
        <h3 className={textClassName()} style={textStyle}>
          {children}
        </h3>
      );
    }

    case "h4": {
      return (
        <h4 className={textClassName()} style={textStyle}>
          {children}
        </h4>
      );
    }

    case "h5": {
      return (
        <h5 className={textClassName()} style={textStyle}>
          {children}
        </h5>
      );
    }

    case "h6": {
      return (
        <h6 className={textClassName()} style={textStyle}>
          {children}
        </h6>
      );
    }

    case "subtitle-1": {
      return (
        <h3 className={textClassName()} style={textStyle}>
          {children}
        </h3>
      );
    }

    case "subtitle-2": {
      return (
        <h3 className={textClassName()} style={textStyle}>
          {children}
        </h3>
      );
    }

    case "body-1": {
      return (
        <p className={textClassName()} style={textStyle}>
          {children}
        </p>
      );
    }

    case "body-2": {
      return (
        <p className={textClassName()} style={textStyle}>
          {children}
        </p>
      );
    }

    case "button": {
      return (
        <label className={textClassName()} style={textStyle}>
          {children}
        </label>
      );
    }

    case "caption": {
      return (
        <span className={textClassName()} style={textStyle}>
          {children}
        </span>
      );
    }

    case "overline": {
      return (
        <span className={textClassName()} style={textStyle}>
          {children}
        </span>
      );
    }

    default: {
      return (
        <p className={textClassName()} style={textStyle}>
          {children}
        </p>
      );
    }
  }
};

Text.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle-1",
    "subtitle-2",
    "body-1",
    "body-2",
    "button",
    "caption",
    "overline",
  ]),
  color: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  responsive: PropTypes.bool,
};

Text.defaultProps = {
  children: "",
  variant: "body-1",
  color: "",
  style: {},
  className: "",
  responsive: false,
};

export default Text;
