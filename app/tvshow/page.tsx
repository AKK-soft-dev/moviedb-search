import fetchData from "@/config/fetch";
import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import FetchedDetector from "@/components/utils/FetchedDetector";
import PopularTVShowDataDisplay from "./PopularTVShowDataDisplay";

export const metadata: Metadata = {
  title: {
    absolute: "Popular TV Shows",
  },
  description: "Discover the popular tv shows!",
};

export default async function PopularTVShowsPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const movies = await fetchData(
    `/tv/popular?language=en-US&page=${searchParams.page || 1}`
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
      <PopularTVShowDataDisplay data={movies} />
      <FetchedDetector />
    </Container>
  );
}
