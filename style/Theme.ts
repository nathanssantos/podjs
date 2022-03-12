import { createTheme } from "@mui/material/styles";

export const colors = {
  orange: "#f66a0a",
  green: "#64ffda",
  blue: "#5374fa",
  lightblue: "#79b8ff",
  lightestBlue: "#c8e1ff",
  slate: "#a8b2d1",
  offWhite: "#f6f8fa",
  grey: "#6a737d",
  grey2: "#586069",
  black: "#1A1E22",
  darkGrey: "#24292e",
  white: "#FFFFFF",
};

export const fonts = {
  roboto: "Roboto, system, -apple-system, Arial, sans-serif",
};

export const transition = `all 0.2s ease-in-out`;

const Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.green,
    },
    secondary: {
      main: colors.blue,
    },
  },
  typography: {
    fontFamily: fonts.roboto,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(26, 30, 34, 0.75)",
          backdropFilter: "blur(0.313rem)",
          backgroundImage: "none",
          boxShadow: "none",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(26, 30, 34, 0.5)",
          backdropFilter: "blur(0.313rem)",
        },
      },
    },
  },
});

export default Theme;
