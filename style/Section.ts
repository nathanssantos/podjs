import styled from "styled-components";
import { colors, fonts, media } from ".";

const Section = styled.section`
  margin-bottom: 8rem;
  padding-top: 4rem;

  .content {
    ${media.bp900`
      padding: 0 6rem;
    `};

    ${media.bp1400`
      padding: 0;
    `};
  }

  header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .fade-in-container-wrapper,
    .transition-container {
      width: 100%;
    }

    h2 {
      font-family: ${fonts.roboto};
      color: ${colors.green};
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      white-space: nowrap;

      ${media.bp900`
        font-size: 1.5rem;
      `};

      &:after {
        content: "";
        height: 0.063rem;
        width: 100%;
        margin-left: 1rem;
        background: linear-gradient(to right, transparent, ${colors.slate});
      }
    }

    &.align-center {
      h2 {
        &:before {
          content: "";
          height: 0.063rem;
          width: 100%;
          margin-right: 1rem;
          background: linear-gradient(to right, ${colors.slate}, transparent);
        }
      }
    }
  }
`;

export default Section;
