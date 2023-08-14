"use client";
import MovieItem from "@/components/utils/MovieItem";
import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TrendingContext } from "./Trending";
import MySlider2 from "@/components/utils/MySlider2";
import SliderItem from "@/components/utils/SliderItem";

export default function TrendingDataDisplay({
  data: initialData,
}: {
  data: { results: [] };
}) {
  const [trendData, setTrendData] = useState(initialData);
  const results = trendData?.results || [];
  const { trendTime, streamed, setStreamed } = useContext(TrendingContext);

  useEffect(() => {
    if (!streamed) {
      setStreamed(true);
      return;
    }

    fetch(`/api/trend/${trendTime}`)
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setTrendData(data);
      });
  }, [trendTime, streamed]);

  return (
    <Box my={3}>
      <MySlider2 prevElSelector=".prev" nextElSelector=".next">
        {results?.map((movie, i) => (
          <SliderItem key={i}>
            <MovieItem movie={movie} />
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
