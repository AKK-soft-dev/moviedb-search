import { Box } from "@mui/material";
import React, { forwardRef } from "react";

type BSGridContainerProps = {
  noWrap?: boolean;
  children: React.ReactNode;
};

const BSGridContainer = forwardRef<HTMLDivElement, BSGridContainerProps>(
  ({ noWrap, children }, ref) => (
    <Box
      ref={ref}
      component="div"
      className="row g-1 g-sm-2 g-md-3 g-lg-4 g-xl-5"
      sx={{
        flexWrap: noWrap ? "nowrap" : "wrap",
      }}
    >
      {children}
    </Box>
  )
);

export default BSGridContainer;

BSGridContainer.displayName = "BSGridContainer";
