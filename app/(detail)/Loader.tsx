"use client";

import { Box, useTheme } from "@mui/material";
import { PuffLoader } from "react-spinners";

export default function Loader() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 1,
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PuffLoader size={250} color={theme.palette.secondary.main} />
    </Box>
  );
}
