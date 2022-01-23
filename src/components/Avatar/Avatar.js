import React from "react";
import PropTypes from "prop-types";
import { Avatar as MUIAvatar } from "@material-ui/core";

import "./styles.scss";

const Avatar = (props) => {
  const { image, name, size, onClick } = props;

  const avatarClassNames = () => {
    let classNames = "avatar";
    if (size) classNames += ` avatar--${size}`;
    if (onClick) classNames += " avatar--clickable";
    return classNames;
  };

  return (
    <div className={avatarClassNames()} onClick={onClick}>
      <div className="avatar__content">
        <MUIAvatar src={image} size={size} />
        {name?.length ? <div className="avatar__name">{name}</div> : null}
      </div>
    </div>
  );
};

Avatar.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large", "extra-large"]),
  onClick: PropTypes.func,
};

Avatar.defaultProps = {
  image: "",
  name: "",
  size: "medium",
  onClick: null,
};

export default Avatar;
