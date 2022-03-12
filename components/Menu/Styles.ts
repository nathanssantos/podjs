import styled from "styled-components";
import { colors, fonts } from "../../style";

const Styles = styled.nav`
  ul {
    display: flex;
    justify-content: space-between;
    gap: 1.25rem;

    a {
      color: ${colors.green};
      font-family: ${fonts.roboto};
    }
  }
`;

export default Styles;
