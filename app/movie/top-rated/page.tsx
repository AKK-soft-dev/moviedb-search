import fetchData from "@/config/fetch";
import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import FetchedDetector from "@/components/utils/FetchedDetector";
import TopRatedMovieDataDisplay from "./TopRatedMovieDataDsiplay";

export const metadata: Metadata = {
  title: {
    absolute: "Top Rated Movies",
  },
  description: "Discover the top rated movies!",
};

export default async function TopRatedMoviesPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const movies = await fetchData(
    `/movie/top_rated?language=en-US&page=${searchParams.page || 1}`
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
      <TopRatedMovieDataDisplay data={movies} />
      <FetchedDetector />
    </Container>
  );
}
