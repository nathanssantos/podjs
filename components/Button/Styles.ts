import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { colors } from "../../style";
import { CustomButtonProps } from "./Button";

const Styles = styled(Button)<CustomButtonProps>`
  position: relative;
  background: linear-gradient(
    94.23deg,
    ${colors.green} 12.41%,
    ${colors.green} 52.55%,
    ${colors.blue} 89.95%
  );

  .background-cover {
    background-color: #1a1e22;
    position: absolute;
    left: 0.063rem;
    right: 0.063rem;
    top: 0.063rem;
    bottom: 0.063rem;
    border-radius: 0.25rem;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .children {
    z-index: 1;
    background: linear-gradient(
      94.23deg,
      ${colors.green} 12.41%,
      ${colors.green} 52.55%,
      ${colors.blue} 89.95%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:hover {
    .background-cover {
      opacity: 0.9;
    }
  }
`;

export default Styles;
