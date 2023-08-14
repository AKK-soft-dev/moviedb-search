import { Box } from "@mui/material";
import React from "react";
import BSGridContainer from "./BSGridContainer";

export default function MySlider2({
  children,
  yelredScrollbar,
  prevElSelector,
  nextElSelector,
}: {
  children: React.ReactNode;
  yelredScrollbar?: boolean;
  prevElSelector?: string;
  nextElSelector?: string;
}) {
  return (
    <Box
      component="div"
      className={`wrapper ${yelredScrollbar ? "yelred" : ""}`}
      sx={{
        "&::-webkit-scrollbar": {
          height: { xs: 5, md: 20 },
        },
      }}
    >
      <BSGridContainer noWrap>{children}</BSGridContainer>
    </Box>
  );
}
