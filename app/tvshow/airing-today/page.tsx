import fetchData from "@/config/fetch";
import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import FetchedDetector from "@/components/utils/FetchedDetector";
import AiringTodayTVShowDataDisplay from "./AiringTodayTVShowDataDisplay";

export const metadata: Metadata = {
  title: {
    absolute: "TV Shows Airing Today",
  },
  description: "Discover the tv shows airing today!",
};

export default async function AiringTodayTVShowsPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const movies = await fetchData(
    `/tv/airing_today?language=en-US&page=${searchParams.page || 1}`
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
      <AiringTodayTVShowDataDisplay data={movies} />
      <FetchedDetector />
    </Container>
  );
}
