import fetchData from "@/config/fetch";
import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import FetchedDetector from "@/components/utils/FetchedDetector";
import UpcomingMovies from "./UpcomingMovies";
import formatDate from "@/utils/format-date";

export const metadata: Metadata = {
  title: {
    absolute: "Upcoming Movies",
  },
  description: "Discover the upcoming movies!",
};

export default async function UpcomingMoviesPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  const next3Days = formatDate(date);
  date.setDate(date.getDate() + 20);
  const next20Days = formatDate(date);

  const movies = await fetchData(
    `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${next3Days}&release_date.lte=${next20Days}&page=${
      searchParams.page || 1
    }`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  return (
    <>
      <UpcomingMovies data={movies} />
      <FetchedDetector />
    </>
  );
}
