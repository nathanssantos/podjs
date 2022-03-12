import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobalStyle, Theme } from "../../style";

interface ThemeProviderProps {
  children: React.ReactElement;
}

const Provider = (props: ThemeProviderProps) => {
  const { children } = props;

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Provider;
