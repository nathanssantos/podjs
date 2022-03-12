import Container from "@mui/material/Container";
import { FadeInContainer } from "../../components";
import Styles from "./Styles";

const Hero = () => {
  return (
    <Styles>
      <Container maxWidth="lg">
        <div className="content">
          <FadeInContainer delay={1300}>
            <h1>Podjs</h1>
          </FadeInContainer>
          <FadeInContainer delay={1450}>
            <h2>Be welcome.</h2>
          </FadeInContainer>
        </div>
      </Container>
    </Styles>
  );
};

export default Hero;
