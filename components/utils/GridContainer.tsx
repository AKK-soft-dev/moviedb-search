"use client";
import { Grid } from "@mui/material";
import React, { forwardRef } from "react";

type GridContainerProps = {
  children: React.ReactNode;
};

const GridContainer = forwardRef<HTMLDivElement, GridContainerProps>(
  ({ children }, ref) => {
    return (
      <Grid
        container
        className="grid-container"
        flexDirection="row"
        flexWrap="nowrap"
        spacing={{ xs: 1.2, sm: 2.2, md: 2.8, lg: 3.2, xl: 4 }}
        ref={ref}
      >
        {children}
      </Grid>
    );
  }
);

export default GridContainer;

GridContainer.displayName = "GridContainer";
