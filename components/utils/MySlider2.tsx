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
    console.log({ nextElSelector, prevElSelector, wrapper, gridContainer });

    if (prevElSelector && nextElSelector && wrapper && gridContainer) {
      const prevButton = document.querySelector(prevElSelector);
      const nextButton = document.querySelector(nextElSelector);
      const childItemWidth =
        gridContainer.children[0].getBoundingClientRect().width;

      const handleMove = (type: "prev" | "next") => {
        wrapper.scrollBy({
          left: type === "prev" ? -childItemWidth : childItemWidth,
          behavior: "smooth",
        });
      };

      const handlePrevMove = () => handleMove("prev");
      const handleNextMove = () => handleMove("next");

      prevButton?.addEventListener("click", handlePrevMove);
      nextButton?.addEventListener("click", handleNextMove);

      return () => {
        prevButton?.removeEventListener("click", handlePrevMove);
        nextButton?.removeEventListener("click", handleNextMove);
      };
    }
  }, []);
  return (
    <Box
      ref={wrapperRef}
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
