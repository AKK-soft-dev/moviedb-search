"use client";
import { useTheme, Box } from "@mui/material";
import SwiperCore from "swiper";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";

// Install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const standardized = (value: number) => value * 8;

export default function CarouselSlider({
  prevElSelector,
  nextElSelector,
  children,
}: {
  prevElSelector: string;
  nextElSelector: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const breakpointsValues = theme.breakpoints.values;

  return (
    <Box sx={{ my: 3 }}>
      <Swiper
        slidesPerView={3}
        spaceBetween={standardized(1.2)}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          enabled: true,
          nextEl: nextElSelector,
          prevEl: prevElSelector,
        }}
        breakpoints={{
          [breakpointsValues.sm]: {
            slidesPerView: 4,
            spaceBetween: standardized(2.2),
          },
          [breakpointsValues.md]: {
            slidesPerView: 6,
            spaceBetween: standardized(2.8),
          },
          [breakpointsValues.lg]: {
            slidesPerView: 6,
            spaceBetween: standardized(3.2),
          },
          [breakpointsValues.xl]: {
            slidesPerView: 7,
            spaceBetween: standardized(4),
          },
        }}
      >
        {children}
      </Swiper>
    </Box>
  );
}
