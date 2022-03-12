import styled from "styled-components";
import { media } from "../../style";

const Styles = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

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
