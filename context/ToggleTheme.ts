import { PaletteMode } from "@mui/material";
import { createContext } from "react";

export const ToggleTheme = createContext<{
  toggleTheme: () => void;
  mode: PaletteMode;
}>({
  toggleTheme: () => {},
  mode: "dark",
});
