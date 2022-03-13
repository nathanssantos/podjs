import styled from "styled-components";
import { media, colors } from "../../style";

const Styles = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 20px;
    font-weight: 800;
    background: linear-gradient(
      94.23deg,
      ${colors.green} 12.41%,
      ${colors.blue} 52.55%,
      ${colors.blue} 89.95%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .MuiContainer-root {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;

    ${media.bp1400`
      padding: 0 1.5rem;
    `};
  }

  .header {
    &__menu {
      display: none;

      ${media.bp900`
        display: flex;
        align-items: center;
        gap: 1rem
      `};
    }

    &__drawer {
      ${media.bp900`
        display: none;
      `};
    }
  }
`;

export default Styles;
