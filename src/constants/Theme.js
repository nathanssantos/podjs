import { createTheme } from "@material-ui/core";

export const primary = "#00a8ff";
export const secondary = "#40739e";

export const warning = "#fbc531";
export const error = "#e84118";
export const success = "#4cd137";
export const info = "#487eb0";

export const light = "#FFFFFF";
export const gray = "#C4C4C4";
export const dark = "#121212";

export const background = dark;

export const light38 = "rgba(255, 255, 255, 0.38)";
export const light60 = "rgba(255, 255, 255, 0.6)";
export const light87 = "rgba(255, 255, 255, 0.87)";

export const dark12 = "rgba(0, 0, 0, 0.12)";
export const dark20 = "rgba(0, 0, 0, 0.2)";
export const dark14 = "rgba(0, 0, 0, 0.14)";
export const dark74 = "rgba(0, 0, 0, 0.74)";
export const dark100 = "rgba(0, 0, 0, 1)";

export const surface0 = dark;
export const surface5 = `linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), ${dark}`;
export const surface7 = `linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.07)), ${dark}`;
export const surface8 = `linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.08)), ${dark}`;
export const surface9 = `linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.09)), ${dark}`;
export const surface11 = `linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.11)), ${dark}`;
export const surface12 = `linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.12)), ${dark}`;
export const surface14 = `linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.14)), ${dark}`;
export const surface15 = `linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.15)), ${dark}`;
export const surface16 = `linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.16)), ${dark}`;

export const elevation0 = "0px 4px 4px rgba(0, 0, 0, 0.25)";
export const elevation5 = `0px 1px 1px ${dark14}, 0px 2px 1px ${dark12}, 0px 1px 3px ${dark20}`;
export const elevation7 = `0px 2px 2px ${dark14}, 0px 3px 1px ${dark12}, 0px 1px 5px ${dark20}`;
export const elevation8 = `0px 3px 4px ${dark14}, 0px 3px 3px ${dark12}, 0px 1px 8px ${dark20}`;
export const elevation9 = `0px 4px 5px ${dark14}, 0px 1px 10px ${dark12}, 0px 2px 4px ${dark20}`;
export const elevation11 = `0px 6px 10px ${dark14}, 0px 1px 18px ${dark12}, 0px 3px 5px ${dark20}`;
export const elevation12 = `0px 8px 10px ${dark14}, 0px 3px 14px ${dark12}, 0px 5px 5px ${dark20}`;
export const elevation14 = `0px 12px 17px ${dark14}, 0px 5px 22px ${dark12}, 0px 7px 8px ${dark20}`;
export const elevation15 = `0px 16px 24px ${dark14}, 0px 6px 30px ${dark12}, 0px 8px 10px ${dark20}`;
export const elevation16 = `0px 24px 38px ${dark14}, 0px 9px 46px ${dark12}, 0px 11px 15px ${dark20}`;

export const borderWidth = 1;
export const borderColor = light38;

export const containerMaxWidth = "lg";

export const xs = 0;
export const sm = 600;
export const md = 960;
export const lg = 1280;
export const xl = 1920;

export const spacing = 8;

const Theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    warning: {
      main: warning,
    },
    error: {
      main: error,
    },
    success: {
      main: success,
    },
    info: {
      main: info,
    },
    common: {
      dark,
    },
    background: {
      default: background,
      dark,
    },
  },
  ripple: {
    color: primary,
  },
  border: {
    borderColor,
    borderWidth,
  },
  breakpoints: {
    values: {
      xs,
      sm,
      md,
      lg,
      xl,
    },
  },
  spacing,
  typography: {
    useNextVariants: true,
    color: light,
  },
});

export default Theme;
