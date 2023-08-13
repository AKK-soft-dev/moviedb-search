import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
  PaletteMode,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { getDesignTokens } from "./getDesignTokens";
import { ToggleTheme } from "./ToggleTheme";

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const defaultMode =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("mode")
      : undefined;
  const [mode, setMode] = useState<PaletteMode>(() => {
    return (defaultMode as PaletteMode) || "dark";
  });

  const theme = useMemo(
    () => responsiveFontSizes(createTheme(getDesignTokens(mode))),
    [mode]
  );

  const toggleTheme = useCallback(() => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  }, [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <ToggleTheme.Provider value={{ toggleTheme, mode }}>
        {children}
      </ToggleTheme.Provider>
    </MuiThemeProvider>
  );
}

export default ThemeContextProvider;
