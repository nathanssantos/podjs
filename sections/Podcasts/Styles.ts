import styled from "styled-components";
import { Section, media, colors, transition } from "../../style";

const Styles = styled(Section)`
  display: flex;
  width: 100%;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    header {
      width: 100%;
    }
  }

  .card-list {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 3rem;

    ${media.bp600`
        grid-template-columns: repeat(3, 1fr);
    `};

    ${media.bp900`
        grid-template-columns: repeat(4, 1fr);
    `};

    ${media.bp1200`
        grid-template-columns: repeat(5, 1fr);
    `};
  }

  .fade-in-container-wrapper {
    display: flex;
  }

  .transition-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export default Styles;
