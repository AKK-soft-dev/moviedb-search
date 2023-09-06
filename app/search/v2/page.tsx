import fetchData from "@/config/fetch";
import { Box, Container } from "@mui/material";
import { Metadata } from "next";
import SearchResults from "./results";
import FetchedDetector from "@/components/utils/FetchedDetector";

export const metadata: Metadata = {
  title: "Search",
  description: "Search movies, tv shows and people from around the world!",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const { query, page = 1 } = searchParams;

  const movies = await fetchData(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`
  ).then((res) => res.json());
  const tv = await fetchData(
    `/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`
  ).then((res) => res.json());
  const people = await fetchData(
    `/search/person?query=${query}&include_adult=false&language=en-US&page=${page}`
  ).then((res) => res.json());

  return (
    <Container>
      <SearchResults movies={movies} shows={tv} people={people} />
      <FetchedDetector />
    </Container>
  );
}
