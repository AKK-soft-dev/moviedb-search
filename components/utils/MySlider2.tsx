"use client";
import { Box, IconButton } from "@mui/material";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import BSGridContainer from "./BSGridContainer";

type MySliderProps = {
  children: React.ReactNode;
  yelredScrollbar?: boolean;
  prevElSelector?: string;
  nextElSelector?: string;
};

export type MySliderHandler = {
  resetScroll: () => void;
  fadeOut: () => void;
  fadeIn: () => void;
};

const MySlider2 = forwardRef<MySliderHandler, MySliderProps>(
  ({ children, yelredScrollbar, prevElSelector, nextElSelector }, ref) => {
    const gridContainerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        resetScroll() {
          wrapperRef.current?.scrollTo({ left: 0, behavior: "smooth" });
        },
        fadeOut() {
          const gridContainer = gridContainerRef.current;
          if (gridContainer) {
            gridContainer.style.pointerEvents = "none";
            gridContainer.style.opacity = "0.6";
          }
        },
        fadeIn() {
          const gridContainer = gridContainerRef.current;

          if (gridContainer) {
            gridContainer.style.pointerEvents = "auto";
            gridContainer.style.opacity = "1";
          }
        },
      }),
      []
    );

    useEffect(() => {
      const gridContainer = gridContainerRef.current;
      const wrapper = wrapperRef.current;
      // console.log({ nextElSelector, prevElSelector, wrapper, gridContainer });

      if (prevElSelector && nextElSelector && wrapper && gridContainer) {
        const prevButton = document.querySelector(
          prevElSelector
        ) as HTMLElement;
        const nextButton = document.querySelector(
          nextElSelector
        ) as HTMLElement;
        const firstChild = gridContainer.children[0];
        const childItemWidth = firstChild?.getBoundingClientRect().width;

        const handleMove = (type: "prev" | "next") => {
          wrapper?.scrollBy({
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
    }, [prevElSelector, nextElSelector]);

    return (
      <Box>
        <Box
          ref={wrapperRef}
          component="div"
          className={`wrapper ${yelredScrollbar ? "yelred" : ""}`}
          sx={{
            position: "relative",
            transition: "all 0.3s ease",
            "&::-webkit-scrollbar": {
              height: { xs: 5, md: 14, lg: 16 },
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
      </Box>
    );
  }
);

export default MySlider2;
MySlider2.displayName = "MySlider";
