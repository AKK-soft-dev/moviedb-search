import fetchData from "@/config/fetch";
import { Container } from "@mui/material";
import { Metadata } from "next";
import MoviesSearchResult from "./movies-search-result";

export const metadata: Metadata = {
  title: "Search Movies",
  description: "Search movies from around the world!",
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

  return (
    <Container>
      <MoviesSearchResult movies={movies} />
    </Container>
  );
}
