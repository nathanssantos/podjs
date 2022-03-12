import { createGlobalStyle } from "styled-components";
import { colors, fonts, transition } from "./Theme";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/Roboto/Roboto-Black.woff2') format('woff2'),
        url('/assets/fonts/Roboto/Roboto-Black.woff') format('woff');
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/Roboto/Roboto-BlackItalic.woff2') format('woff2'),
        url('/assets/fonts/Roboto/Roboto-BlackItalic.woff') format('woff');
    font-weight: 900;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/Roboto/Roboto-Bold.woff2') format('woff2'),
        url('/assets/fonts/Roboto/Roboto-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/Roboto/Roboto-BoldItalic.woff2') format('woff2'),
        url('/assets/fonts/Roboto/Roboto-BoldItalic.woff') format('woff');
    font-weight: bold;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/Roboto/Roboto-Regular.woff2') format('woff2'),
        url('/assets/fonts/Roboto/Roboto-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/Roboto/Roboto-Italic.woff2') format('woff2'),
        url('/assets/fonts/Roboto/Roboto-Italic.woff') format('woff');
    font-weight: normal;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/Roboto/Roboto-Light.woff2') format('woff2'),
        url('/assets/fonts/Roboto/Roboto-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/Roboto/Roboto-LightItalic.woff2') format('woff2'),
        url('/assets/fonts/Roboto/Roboto-LightItalic.woff') format('woff');
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/Roboto/Roboto-Medium.woff2') format('woff2'),
        url('/assets/fonts/Roboto/Roboto-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/Roboto/Roboto-MediumItalic.woff2') format('woff2'),
        url('/assets/fonts/Roboto/Roboto-MediumItalic.woff') format('woff');
    font-weight: 500;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/Roboto/Roboto-Thin.woff2') format('woff2'),
        url('/assets/fonts/Roboto/Roboto-Thin.woff') format('woff');
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/Roboto/Roboto-ThinItalic.woff2') format('woff2'),
        url('/assets/fonts/Roboto/Roboto-ThinItalic.woff') format('woff');
    font-weight: 100;
    font-style: italic;
  }

  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: #444;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }


  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${fonts.roboto};
    color: ${colors.slate};
    background-color: ${colors.black};
    
    &::-webkit-scrollbar {
      width: 0.375rem;
    }

    &::-webkit-scrollbar-track {
      background: none;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: ${colors.green};
      border-radius: 0.188rem;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  p {
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    transition: ${transition};
    color: currentColor;
    display: inline-block;
  }

  ul, ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    fill: currentColor;
  }

  button {
    cursor: poRoboto;
    border: 0;
    border-radius: 0;
    transition: ${transition};
    &:focus,
    &:active {
      outline: 0;
    }
  }

  input {
    border-radius: 0;
    outline: 0;
    &:focus {
      outline: 0;
    }
    &::placeholder {
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }
`;

export default GlobalStyle;
