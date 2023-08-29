import fetchData from "@/config/fetch";
import { Container } from "@mui/material";
import { Metadata } from "next";
import PeopleSearchResult from "./people-search-result";

export const metadata: Metadata = {
  title: "Search People",
  description: "Search people from around the world!",
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

  const people = await fetchData(
    `/search/person?query=${query}&include_adult=false&language=en-US&page=${page}`
  ).then((res) => res.json());

  return (
    <Container>
      <PeopleSearchResult people={people} />
    </Container>
  );
}
