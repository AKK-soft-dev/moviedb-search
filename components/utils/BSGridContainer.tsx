import { Box } from "@mui/material";
import React from "react";

export default function BSGridContainer({
  noWrap,
  children,
}: {
  noWrap?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Box
      component="div"
      className="row g-1 g-sm-2 g-md-3 g-lg-4 g-xl-5"
      sx={{
        flexWrap: noWrap ? "nowrap" : "wrap",
      }}
    >
      {children}
    </Box>
  );
}
