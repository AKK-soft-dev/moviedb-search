import fetchData from "@/config/fetch";
import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import PopularMovieDataDisplay from "./PopularMovieDataDisplay";
import FetchedDetector from "@/components/utils/FetchedDetector";

export const metadata: Metadata = {
  title: {
    absolute: "Popular Movies",
  },
  description: "Discover the popular movies!",
};

export default async function PopularMoviesPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const movies = await fetchData(
    `/movie/popular?language=en-US&page=${searchParams.page || 1}`
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
          Popular Movies
        </Typography>
      </Box>
      <PopularMovieDataDisplay data={movies} />
      <FetchedDetector />
    </Container>
  );
}
