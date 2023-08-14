"use client";
import { Box, Grid } from "@mui/material";
import { useEffect, useRef } from "react";

export default function SliderItem({
  children,
}: {
  children: React.ReactNode;
}) {
  const gridItemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const gridItemElement = gridItemRef.current;
    const gridContainerElement = document.querySelector(
      ".grid-container"
    ) as HTMLDivElement;

    const gridItemMaxWidth = window.getComputedStyle(gridItemElement!).maxWidth;
    const gridContainerWidth = gridContainerElement.offsetWidth;
    // Convert the relative value to an absolute pixel value
    const relativeValue = parseFloat(gridItemMaxWidth); // Remove '%' or other units
    const absoluteValue = (relativeValue / 100) * gridContainerWidth;

    gridItemElement!.style.width = absoluteValue + "px";
  });
  return (
    <Grid
      component={Box}
      sx={{
        flex: "0 0 auto",
      }}
      ref={gridItemRef}
      item
      xs={4}
      sm={3}
      md={2}
      lg={2}
      xl={1.5}
    >
      {children}
    </Grid>
  );
}
