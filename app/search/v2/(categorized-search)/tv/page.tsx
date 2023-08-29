import fetchData from "@/config/fetch";
import { Container } from "@mui/material";
import { Metadata } from "next";
import TVShowsSearchResult from "./tvshows-search-result";

export const metadata: Metadata = {
  title: "Search TV Shows",
  description: "Search tv shows from around the world!",
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

  const tvShows = await fetchData(
    `/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`
  ).then((res) => res.json());

  return (
    <Container>
      <TVShowsSearchResult tvShows={tvShows} />
    </Container>
  );
}
