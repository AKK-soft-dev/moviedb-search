import fetchData from "@/config/fetch";
import type { Metadata } from "next";
import FetchedDetector from "@/components/utils/FetchedDetector";
import TopRatedMovies from "./TopRatedMovies";

export const metadata: Metadata = {
  title: {
    absolute: "Top Rated Movies",
  },
  description: "Discover the top rated movies!",
};

export default async function TopRatedMoviesPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const movies = await fetchData(
    `/movie/top_rated?language=en-US&page=${searchParams.page || 1}`
  ).then((res) => res.json());
  return (
    <>
      <TopRatedMovies data={movies} />
      <FetchedDetector />
    </>
  );
}
