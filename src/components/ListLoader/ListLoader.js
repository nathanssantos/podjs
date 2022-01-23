import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./styles.scss";

const ListLoader = (props) => {
  const { variant, length, interval } = props;
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const getListLoaderClassNames = () => {
    let newClassName = "list-loader";

    if (variant) newClassName += ` list-loader--${variant}`;

    return newClassName;
  };

  const getListLoaderItemClassNames = (index) => {
    let newClassName = "list-loader__item";

    if (index === activeItemIndex || index === activeItemIndex - 1) {
      newClassName += " list-loader__item--active";
    }

    // if (variant?.length) newClassName += ` list-loader__item--${variant}`;

    if (variant === "grid" && index % 3) {
      newClassName += " list-loader__item--wide";
    }

    return newClassName;
  };

  useEffect(() => {
    let index = 0;

    const animation = () => {
      if (index >= length) index = 0;

      setActiveItemIndex(index);

      index++;
    };

    animation();

    const animationInterval = setInterval(animation, interval);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className={getListLoaderClassNames()}>
      {new Array(length).fill("").map((_, index) => (
        <div key={index} className={getListLoaderItemClassNames(index)} />
      ))}
    </div>
  );
};

ListLoader.propTypes = {
  variant: PropTypes.oneOf(["list", "grid"]),
  length: PropTypes.number,
  interval: PropTypes.number,
};

ListLoader.defaultProps = {
  variant: "list",
  length: 12,
  interval: 150,
};

export default ListLoader;
