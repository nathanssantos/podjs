import { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu } from "../";
import { colors } from "../../style";

import StyledBox from "./Styles";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div>
      <IconButton
        onClick={toggleDrawer}
        className="bt-drawer"
        style={{ color: colors.green }}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <StyledBox role="presentation" onClick={toggleDrawer}>
          <Menu />
        </StyledBox>
      </SwipeableDrawer>
    </div>
  );
};

export default Drawer;
