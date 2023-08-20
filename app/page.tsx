import Hero from "@/components/home/Hero";
import Popular from "@/components/home/popular/Popular";
import { Box, Container, Divider } from "@mui/material";
import Trending from "@/components/home/trending/Trending";
import StreamTrending from "@/components/home/trending/StreamTrending";
import SingleRowSkeleton from "@/components/skeletons/SingleRowSkeleton";
import { Suspense } from "react";
import StreamPopular from "@/components/home/popular/StreamPopular";
import fetchData from "@/config/fetch";

export default async function Home() {
  const trendData = await fetchData("/trending/movie/day?language=en-US", {
    cache: "no-store",
  }).then((res) => res.json());

  const trendingMovies = trendData?.results || [];

  const randomMovie =
    trendingMovies[Math.ceil(Math.random() * trendingMovies.length)];

  return (
    <Box component="main">
      <Hero backgroundImageUrl={randomMovie?.backdrop_path} />
      <Trending>
        <Suspense fallback={<SingleRowSkeleton length={12} />}>
          <StreamTrending />
        </Suspense>
      </Trending>
      <Container>
        <Divider orientation="horizontal" />
      </Container>
      <Popular>
        <Suspense fallback={<SingleRowSkeleton length={12} />}>
          <StreamPopular />
        </Suspense>
      </Popular>
    </Box>
  );
}
