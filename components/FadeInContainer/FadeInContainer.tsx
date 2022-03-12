import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { motion } from "framer-motion";

interface TransitionContainerProps {
  children: React.ReactElement;
  delay: number;
}

interface FadeInContainerProps {
  children: React.ReactElement;
  lazyLoad?: Boolean;
  height?: number;
  delay?: number;
  once?: boolean;
  offset?: number;
}

const TransitionContainer = (props: TransitionContainerProps) => {
  const { children, delay } = props;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      animate={{ y: isVisible ? 0 : 16, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      initial={false}
      className="transition-container"
    >
      {children}
    </motion.div>
  );
};

const FadeInContainer = (props: FadeInContainerProps) => {
  const {
    children,
    lazyLoad = false,
    height = 16,
    delay = 0,
    once = true,
    offset = -150,
  } = props;

  if (lazyLoad) {
    return (
      <LazyLoad
        height={height}
        once={once}
        offset={offset}
        classNamePrefix="fade-in-container"
      >
        <TransitionContainer delay={delay}>{children}</TransitionContainer>
      </LazyLoad>
    );
  }

  return <TransitionContainer delay={delay}>{children}</TransitionContainer>;
};

export default FadeInContainer;
