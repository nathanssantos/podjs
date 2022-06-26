import { Input, Select, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      '*': {
        boxSizing: 'border-box',
      },
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
    },
  },
  colors: {
    gray: {
      700: '#161b22',
      800: '#0d1117',
    },
  },
  shadows: { outline: '0 0 0 3px var(--chakra-colors-teal-300)' },
});

Input.defaultProps = { ...Input.defaultProps, focusBorderColor: 'teal.300' };
Select.defaultProps = { ...Select.defaultProps, focusBorderColor: 'teal.300' };

export default theme;
