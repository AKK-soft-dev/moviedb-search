import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import BSGridContainer from "./BSGridContainer";
import { useDataQuery, useDataQueryMagic } from "react-data-query";

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
  const { data: resetScroll } = useDataQuery("reset-scroll", undefined, {
    autoFetchEnabled: false,
    initialData: false,
    staleTime: Infinity,
  });
  const { setQueryData } = useDataQueryMagic();

  console.log({ resetScroll });
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const gridContainer = gridContainerRef.current;
    console.log({ nextElSelector, prevElSelector, wrapper, gridContainer });

    if (prevElSelector && nextElSelector && wrapper && gridContainer) {
      const prevButton = document.querySelector(prevElSelector);
      const nextButton = document.querySelector(nextElSelector);
      const childItemWidth =
        gridContainer.children[0].getBoundingClientRect().width;

      if (resetScroll) {
        console.log("reset scroll");
        wrapper.scrollTo({ left: 0, behavior: "smooth" });
      }

      const handleMove = (type: "prev" | "next") => {
        if (resetScroll) {
          setQueryData("reset-scroll", () => false);
        }
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
  }, [resetScroll]);
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
