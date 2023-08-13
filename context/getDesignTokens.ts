import { roboto } from "@/fonts/fonts";
import { PaletteMode, ThemeOptions } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
  const darkMode = mode === "dark";
  return {
    palette: {
      mode,
      primary: {
        main: "rgb(55, 125, 255)",
        dark: "rgb(47, 106, 217)",
      },
      secondary: {
        main: "rgb(255, 225, 2)",
        dark: "rgb(249, 185, 52)",
      },
      background: {
        paper: darkMode ? "#222b45" : "#ffffff",
        default: darkMode ? "#1a2138" : "#f7faff",
      },
      text: {
        primary: darkMode ? "rgb(238, 238, 239)" : "rgb(30, 32, 34)",
        secondary: darkMode ? "rgb(174, 176, 180)" : "rgb(30, 32, 34, 0.56)",
      },
    },
    typography: {
      fontFamily: [roboto.style.fontFamily, "Inter", "sans-serif"].join(", "),
      body1: {
        fontWeight: 500,
        textDecoration: "none",
      },
    },
    shape: {
      borderRadius: 6,
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            padding: "10px 22px",
            textTransform: "none",
          },
        },
      },
    },
  };
};
