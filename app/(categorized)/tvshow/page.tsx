import fetchData from "@/config/fetch";
import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import FetchedDetector from "@/components/utils/FetchedAndPageLoadedDetector";
import PopularTVShows from "./PopularTVShows";

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
    <>
      <PopularTVShows data={movies} />
      <FetchedDetector />
    </>
  );
}
