import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { motion } from "framer-motion";
import Styles from "./Styles";
import { Drawer, Menu, FadeInContainer } from "../";

const Header = () => {
  const [headerShown, setHeaderShown] = useState(true);
  let lastScrollTop = 0;

  const detectScrollDirection = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      setHeaderShown(false);
    } else {
      setHeaderShown(true);
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  };

  useEffect(() => {
    window.addEventListener("scroll", detectScrollDirection, false);

    return () => {
      window.removeEventListener("scroll", detectScrollDirection, false);
    };
  }, []);

  return (
    <AppBar
      component={motion.div}
      className="header"
      position="sticky"
      animate={{ y: headerShown ? 0 : "-100%", opacity: headerShown ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      initial={false}
    >
      <Toolbar>
        <Styles>
          <FadeInContainer delay={1000}>
            <h1>Podjs</h1>
          </FadeInContainer>
          <div className="header__menu">
            <Menu />
          </div>
          <div className="header__drawer">
            <FadeInContainer delay={1150}>
              <Drawer />
            </FadeInContainer>
          </div>
        </Styles>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
