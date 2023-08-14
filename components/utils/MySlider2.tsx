import { Box } from "@mui/material";
import React from "react";
import BSGridContainer from "./BSGridContainer";

export default function MySlider2({
  children,
  prevElSelector,
  nextElSelector,
}: {
  children: React.ReactNode;
  prevElSelector?: string;
  nextElSelector?: string;
}) {
  return (
    <Box component="div" className="wrapper">
      <BSGridContainer noWrap>{children}</BSGridContainer>
    </Box>
  );
}
