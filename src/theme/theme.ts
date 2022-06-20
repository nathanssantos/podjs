import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      html: {
        scrollBehavior: 'smooth',
      },
      'html, body': {
        padding: 0,
        margin: 0,
        fontFamily:
          'Titillium Web, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      },
      a: {
        color: 'inherit',
        textDecoration: 'none',
      },
      '*': {
        boxSizing: 'border-box',
      },
    },
  },
  colors: {
    gray: {
      700: '#161b22',
      800: '#0d1117',
    },
  },
});

export default theme;
