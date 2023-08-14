import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
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
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const gridContainer = gridContainerRef.current;
    if (prevElSelector && nextElSelector && wrapper && gridContainer) {
      const prevButton = document.querySelector(prevElSelector);
      const nextButton = document.querySelector(nextElSelector);
      const childItemWidth =
        gridContainer.children[0].getBoundingClientRect().width;

      prevButton?.addEventListener("click", () => {
        wrapper.scrollBy({ left: -childItemWidth, behavior: "smooth" });
      });

      nextButton?.addEventListener("click", () => {
        wrapper.scrollBy({ left: childItemWidth, behavior: "smooth" });
      });
    }
  }, []);
  return (
    <Box
      component="div"
      className={`wrapper ${yelredScrollbar ? "yelred" : ""}`}
      sx={{
        "&::-webkit-scrollbar": {
          height: { xs: 5, md: 14, lg: 20 },
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: { md: "solid 3px transparent" },
        },
      }}
    >
      <BSGridContainer noWrap ref={gridContainerRef}>
        {children}
      </BSGridContainer>
    </Box>
  );
}
