"use client";
import MovieItem from "@/components/utils/MovieItem";
import { useContext, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { TrendingContext } from "./Trending";
import MySlider2, { MySliderHandler } from "@/components/utils/MySlider2";
import SliderItem from "@/components/utils/SliderItem";

export default function TrendingDataDisplay({
  data: initialData,
}: {
  data: { results: any[] };
}) {
  const [trendData, setTrendData] = useState(initialData);
  const results = trendData?.results || [];
  const { trendTime } = useContext(TrendingContext);
  const sliderHandler = useRef<MySliderHandler>(null);
  const streamed = useRef(false);

  useEffect(() => {
    if (!streamed.current) {
      streamed.current = true;
      return;
    }
    sliderHandler.current?.fadeOut();
    fetch(`/api/trend/${trendTime}`)
      .then((res) => res.json())
      .then((data) => {
        setTrendData(data);
      })
      .finally(() => {
        sliderHandler.current?.fadeIn();
        sliderHandler.current?.resetScroll();
      });
  }, [trendTime]);

  return (
    <Box my={3}>
      <MySlider2
        ref={sliderHandler}
        prevElSelector=".prev"
        nextElSelector=".next"
      >
        {results?.map((movie) => (
          <SliderItem key={movie.id}>
            <MovieItem data={movie} />
          </SliderItem>
        ))}
      </MySlider2>
    </Box>
  );
}

{
  /* <CarouselSlider prevElSelector=".prev" nextElSelector=".next">
  {results?.map((movie, i) => (
    <SwiperSlide key={i}>
      <MovieItem movie={movie} />
    </SwiperSlide>
  ))}
</CarouselSlider>; */
}
