import fetchData from "@/config/fetch";
import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import FetchedDetector from "@/components/utils/FetchedDetector";
import TopRatedTVShowDataDisplay from "./TopRatedTVShowDataDisplay";

export const metadata: Metadata = {
  title: {
    absolute: "Top Rated TV Shows",
  },
  description: "Discover the top rated tv shows!",
};

export default async function TopRatedTVShowsPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const movies = await fetchData(
    `/tv/top_rated?language=en-US&page=${searchParams.page || 1}`
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
          Popular TV Shows
        </Typography>
      </Box>
      <TopRatedTVShowDataDisplay data={movies} />
      <FetchedDetector />
    </Container>
  );
}
