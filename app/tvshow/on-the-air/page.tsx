import fetchData from "@/config/fetch";
import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import FetchedDetector from "@/components/utils/FetchedDetector";
import OnTheAirTVShowDataDisplay from "./OnTheAirTVShowDataDisplay";

export const metadata: Metadata = {
  title: {
    absolute: "TV Shows On the Air",
  },
  description: "Discover the tv shows on the air!",
};

export default async function OnTheAirTVShowsPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const movies = await fetchData(
    `/tv/on_the_air?language=en-US&page=${searchParams.page || 1}`
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
          TV Shows On the Air
        </Typography>
      </Box>
      <OnTheAirTVShowDataDisplay data={movies} />
      <FetchedDetector />
    </Container>
  );
}
