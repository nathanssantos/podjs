import MUIButton from "@mui/material/Button";
import FadeInContainer from "../FadeInContainer/FadeInContainer";
import Styles from "./Styles";

const Menu = () => {
  return (
    <Styles className="menu">
      <ul>
        <li>
          <FadeInContainer delay={1150}>
            <MUIButton component="a" href="/#projects">
              Projects
            </MUIButton>
          </FadeInContainer>
        </li>
      </ul>
    </Styles>
  );
};

export default Menu;
