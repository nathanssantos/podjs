import styled from "styled-components";
import { colors, fonts, Section, media } from "../../style";

const Styles = styled(Section)`
  padding: 0 0 3rem;
  min-height: calc(100vh - 4rem);
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .MuiContainer-root {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;

    h1,
    h2 {
      font-size: clamp(2rem, 5vw, 4rem);
      font-weight: 800;
      line-height: 1;
    }

    h1 {
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

    h2 {
      margin-bottom: 1.875rem;
    }

    h3 {
      font-size: 1.125rem;
      line-height: 1;
      font-weight: 300;
      font-family: ${fonts.roboto};
      color: ${colors.green};
    }

    h4 {
      max-width: 25rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5rem;

      a {
        color: ${colors.green};
      }
    }
  }
`;

export default Styles;
