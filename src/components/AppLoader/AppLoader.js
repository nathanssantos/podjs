import React from "react";

import "./styles.scss";

const AppLoader = () => {
  return (
    <div className="app-loader">
      <svg
        width="154"
        height="154"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="checkout-loader__spinner"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="8"
          r="42"
          strokeDasharray="197.92033717615698 67.97344572538566"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

export default AppLoader;
