import fetchData from "@/config/fetch";
import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import NowPlayingMovieDataDisplay from "./NowPlayingMovieDataDisplay";
import FetchedDetector from "@/components/utils/FetchedDetector";

export const metadata: Metadata = {
  title: {
    absolute: "Now Playing Movies",
  },
  description: "Discover the now playing movies!",
};

export default async function NowPlayingMoviesPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const movies = await fetchData(
    `/movie/now_playing?language=en-US&page=${searchParams.page || 1}`
  ).then((res) => res.json());
  return (
    <Container>
      <Box my={2} textAlign="center">
        <Typography
          variant="h5"
          component="h1"
          display="inline"
          sx={{
            backgroundImage: `linear-gradient(transparent 83%, rgb(55, 125, 255) 10%)`,
          }}
        >
          Now Playing Movies
        </Typography>
      </Box>
      <NowPlayingMovieDataDisplay data={movies} />
      <FetchedDetector />
    </Container>
  );
}
