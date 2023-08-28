import SearchResult from "./search-result";
import fetchData from "@/config/fetch";
import { Box, Container } from "@mui/material";
import SearchPageTabs from "./tabs";
import { Metadata } from "next";
import { PanelType } from "./withPanel";

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
    for?: PanelType;
  };
}) {
  const { query, page = 1, for: pageFor } = searchParams;

  const movies = await fetchData(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=${
      pageFor === "movie" ? page : 1
    }`
  ).then((res) => res.json());
  const tv = await fetchData(
    `/search/tv?query=${query}&include_adult=false&language=en-US&page=${
      pageFor === "tv" ? page : 1
    }`
  ).then((res) => res.json());
  const people = await fetchData(
    `/search/person?query=${query}&include_adult=false&language=en-US&page=${
      pageFor === "person" ? page : 1
    }`
  ).then((res) => res.json());

  return (
    <Container>
      <Box position="relative">
        <SearchPageTabs movies={movies} shows={tv} people={people} />
      </Box>
      <SearchResult />
    </Container>
  );
}
