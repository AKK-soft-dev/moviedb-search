import fetchData from "@/config/fetch";
import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import FetchedDetector from "@/components/utils/FetchedDetector";
import PopularPersonDataDisplay from "./PopularPersonDataDisplay";

export const metadata: Metadata = {
  title: {
    absolute: "Popular People",
  },
  description: "Discover the popular people!",
};

export default async function PopularPeoplePage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const people = await fetchData(
    `/person/popular?language=en-US&page=${searchParams.page || 1}`
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
          Popular People
        </Typography>
      </Box>
      <PopularPersonDataDisplay data={people} />
      <FetchedDetector />
    </Container>
  );
}
