import { css } from "styled-components";

interface Sizes {
  bp1400: number;
  bp1200: number;
  bp900: number;
  bp600: number;
  bp400: number;
}

const sizes = {
  bp1400: 1400,
  bp1200: 1200,
  bp900: 900,
  bp600: 600,
  bp400: 400,
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label as keyof Sizes] / 16;
  (accumulator as any)[label] = (...args: any) => {
    return css`
      @media (min-width: ${emSize}em) {
        ${css([...args] as any)};
      }
    `;
  };

  return accumulator;
}, {} as any);

export default media;
