/* eslint-disable react/prop-types */
import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import Theme from '../../constants/Theme';

const Provider = (props) => {
  const { children } = props;
  return (
    <ThemeProvider theme={createTheme(Theme)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Provider;
