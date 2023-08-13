"use client";

import { Box, useTheme } from "@mui/material";

function DividerSvg() {
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";
  return (
    <Box
      sx={{ width: 1, mb: 2 }}
      component="svg"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1920 100.1"
    >
      <path
        fill={darkMode ? "#222B45" : "#ffffff"}
        d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
      ></path>
    </Box>
  );
}

export default DividerSvg;
