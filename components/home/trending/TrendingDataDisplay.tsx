"use client";
import CarouselSlider from "@/components/utils/CarouselSlider";
import MovieItem from "@/components/utils/MovieItem";
import { useContext, useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { TrendingContext } from "./Trending";

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
    <CarouselSlider prevElSelector=".prev" nextElSelector=".next">
      {results?.map((movie, i) => (
        <SwiperSlide key={i}>
          <MovieItem movie={movie} />
        </SwiperSlide>
      ))}
    </CarouselSlider>
  );
}
