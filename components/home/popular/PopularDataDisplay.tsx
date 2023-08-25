"use client";
import MovieItem from "@/components/utils/MovieItem";
import { useContext, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { PopularContext } from "./Popular";
import MySlider2, { MySliderHandler } from "@/components/utils/MySlider2";
import SliderItem from "@/components/utils/SliderItem";

export default function PopularDataDisplay({
  data: initialData,
}: {
  data: { results: any[] };
}) {
  const [trendData, setTrendData] = useState(initialData);
  const sliderHandler = useRef<MySliderHandler>(null);
  const results = trendData?.results || [];
  const { releaseType, setStreamed } = useContext(PopularContext);

  const streamed = useRef<boolean>(false);

  useEffect(() => {
    if (!streamed.current) {
      streamed.current = true;
      return;
    }
    sliderHandler.current?.fadeOut();
    fetch(`/api/popular/${releaseType}`)
      .then((res) => res.json())
      .then((data) => {
        setTrendData(data);
      })
      .finally(() => {
        sliderHandler.current?.fadeIn();
        sliderHandler.current?.resetScroll();
      });
  }, [releaseType]);

  return (
    <Box my={3}>
      <MySlider2
        ref={sliderHandler}
        yelredScrollbar
        prevElSelector=".popular-prev"
        nextElSelector=".popular-next"
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
