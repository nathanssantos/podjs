import { css } from "styled-components";
import { colors } from ".";

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
  `,

  ellipsis: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
};

export default mixins;
