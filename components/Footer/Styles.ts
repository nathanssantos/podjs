import styled from "styled-components";
import { fonts, colors } from "../../style";

const Styles = styled.footer`
  text-align: center;
  font-family: ${fonts.roboto};
  font-size: 0.75rem;
  padding: 8rem 0 2.5rem;

  a {
    color: ${colors.green};

    &:hover {
    }
  }
`;

export default Styles;
