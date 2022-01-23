import React from "react";
import PropTypes from "prop-types";

const Rocket = () => {
  return (
    <svg width="149" height="174" viewBox="0 0 317 363" fill="none">
      <path
        d="M60.5649 299.039L60.5425 299.023L60.9495 343.759L102.811 327.994L102.825 328L102.427 283.274L60.5649 299.039Z"
        fill="url(#paint0_linear_19_6136)"
      />
      <path
        d="M60.1646 276.921L123.584 320.382L150.235 281.509L86.8135 238.048L60.1646 276.921Z"
        fill="url(#paint1_linear_19_6136)"
      />
      <path
        d="M219.17 8.35365L132.944 134.124L95.0717 141.191L64.9366 146.812L47.6059 172.091L17.8329 215.518L0.5 240.802L30.6375 235.176L68.5099 228.108L61.7477 237.973L159.343 304.859L165.859 295.352L172.816 332.622L178.44 362.755L195.773 337.474L225.546 294.049L242.877 268.77L237.252 238.633L230.293 201.365L316.763 75.2419L295.875 0.74263L219.17 8.35365ZM91.8851 232.354L231.347 28.9326L279.913 24.1053L293.158 71.3425L153.717 274.731L91.8851 232.354ZM77.7366 166.47L115.614 159.405L85.8406 202.832L47.9703 209.895L77.7366 166.47ZM183.194 270.071L212.963 226.644L219.917 263.911L190.147 307.341L183.194 270.071Z"
        fill="url(#paint2_linear_19_6136)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_19_6136"
          x1="56.1948"
          y1="318.269"
          x2="107.183"
          y2="308.753"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F1552C" />
          <stop offset="0.5" stopColor="#F36C42" />
          <stop offset="1" stopColor="#F6916A" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_19_6136"
          x1="62.0932"
          y1="287.256"
          x2="148.306"
          y2="271.167"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#221F1F" />
          <stop offset="0.5" stopColor="#5C5D5F" />
          <stop offset="1" stopColor="#757779" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_19_6136"
          x1="89.4682"
          y1="301.779"
          x2="295.827"
          y2="0.71124"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F1552C" />
          <stop offset="0.5" stopColor="#F36C42" />
          <stop offset="1" stopColor="#F6916A" />
        </linearGradient>
      </defs>
    </svg>
  );
};

Rocket.propTypes = {
  secondary: PropTypes.bool,
};

Rocket.defaultProps = {
  secondary: false,
};

export default Rocket;
