import { Suspense } from "react";
import SearchResult from "./search-result";
import SearchingIndicatorSkeleton from "@/components/skeletons/SearchingIndicatorSkeleton";
import fetchData from "@/config/fetch";
import { Box, Container } from "@mui/material";
import SearchPageTabs from "./tabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search movies, tv shows and people from around the world!",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  console.log("searching");
  const movies = await fetchData(
    `/search/movie?query=${searchParams?.query}&include_adult=false&language=en-US&page=1`
  ).then((res) => res.json());
  const tv = await fetchData(
    `/search/tv?query=${searchParams?.query}&include_adult=false&language=en-US&page=1`
  ).then((res) => res.json());
  const people = await fetchData(
    `/search/person?query=${searchParams?.query}&include_adult=false&language=en-US&page=1`
  ).then((res) => res.json());

  return (
    <Container>
      <Box position="relative">
        <SearchPageTabs movies={movies} shows={tv} people={people} />
      </Box>
      <Suspense fallback={<SearchingIndicatorSkeleton />}>
        <SearchResult />
      </Suspense>
    </Container>
  );
}
