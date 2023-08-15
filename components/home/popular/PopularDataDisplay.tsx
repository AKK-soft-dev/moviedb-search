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
  data: { results: [] };
}) {
  const [trendData, setTrendData] = useState(initialData);
  const sliderHandler = useRef<MySliderHandler>(null);
  const results = trendData?.results || [];
  const { releaseType, streamed, setStreamed } = useContext(PopularContext);

  useEffect(() => {
    if (!streamed) {
      setStreamed(true);
      return;
    }
    if (streamed) {
      fetch(`/api/popular/${releaseType}`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setTrendData(data);
          sliderHandler.current?.resetScroll();
        });
    }
  }, [releaseType, streamed]);

  return (
    <Box my={3}>
      <MySlider2
        ref={sliderHandler}
        yelredScrollbar
        prevElSelector=".popular-prev"
        nextElSelector=".popular-next"
      >
        {results?.map((movie, i) => (
          <SliderItem key={i}>
            <MovieItem movie={movie} />
          </SliderItem>
        ))}
      </MySlider2>
    </Box>
  );
}
