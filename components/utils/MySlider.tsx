"use client";
import { Box } from "@mui/material";
import GridContainer from "./GridContainer";
import { useEffect, useRef } from "react";

export default function MySlider({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const slider = sliderRef.current;
    if (wrapper && slider) {
      const itemWidth = slider.children[0].getBoundingClientRect().width;
      let activeIndex = 0;

      // Touch Events
      let touchStartX = 0;
      let touchDeltaX = 0;

      slider.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
      });

      slider.addEventListener("touchmove", (e) => {
        touchDeltaX = e.touches[0].clientX - touchStartX;
        const newScrollPosition = -activeIndex * itemWidth + touchDeltaX;
        slider.style.transform = `translateX(${newScrollPosition}px)`;
      });

      slider.addEventListener("touchend", () => {
        if (Math.abs(touchDeltaX) > itemWidth / 3) {
          activeIndex +=
            touchDeltaX > 0
              ? -Math.round(touchDeltaX / itemWidth)
              : Math.round(-touchDeltaX / itemWidth);
        }
        touchStartX = 0;
        touchDeltaX = 0;
        activeIndex = Math.max(0, Math.min(activeIndex, 49)); // Ensure activeIndex stays within bounds
        const newScrollPosition = -activeIndex * itemWidth;
        slider.style.transform = `translateX(${newScrollPosition}px)`;
      });

      // Mouse Events
      let isDragging = false;
      let mouseX = 0;
      let mouseDeltaX = 0;

      slider.addEventListener("mousedown", (e) => {
        isDragging = true;
        mouseX = e.clientX;
        e.preventDefault();
      });

      wrapper.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        mouseDeltaX = e.clientX - mouseX;
        const newScrollPosition = -activeIndex * itemWidth + mouseDeltaX;
        slider.style.transform = `translateX(${newScrollPosition}px)`;
      });

      wrapper.addEventListener("mouseup", () => {
        if (Math.abs(mouseDeltaX) > itemWidth / 3) {
          activeIndex +=
            mouseDeltaX > 0
              ? -Math.round(mouseDeltaX / itemWidth)
              : Math.round(-mouseDeltaX / itemWidth);
        }
        isDragging = false;
        mouseX = 0;
        mouseDeltaX = 0;
        activeIndex = Math.max(0, Math.min(activeIndex, 49)); // Ensure activeIndex stays within bounds
        const newScrollPosition = -activeIndex * itemWidth;
        slider.style.transform = `translateX(${newScrollPosition}px)`;
      });

      wrapper.addEventListener("mouseleave", () => {
        isDragging = false;
        mouseX = 0;
        mouseDeltaX = 0;
      });

      // Automatic Scroll
      //   setInterval(() => {
      //     activeIndex = (activeIndex + 1) % 50;
      //     const newScrollPosition = -activeIndex * itemWidth;
      //     slider.style.transform = `translateX(${newScrollPosition}px)`;
      //   }, 3000);
    }
  }, []);

  return (
    <Box my={3}>
      <Box
        ref={wrapperRef}
        sx={{
          position: "relative",
          width: 1,
          overflow: "hidden",
        }}
      >
        <GridContainer ref={sliderRef}>{children}</GridContainer>
      </Box>
    </Box>
  );
}
