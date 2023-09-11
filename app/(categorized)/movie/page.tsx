import fetchData from "@/config/fetch";
import type { Metadata } from "next";
import PopularMovies from "./PopularMovies";
import FetchedDetector from "@/components/utils/FetchedAndPageLoadedDetector";

export const metadata: Metadata = {
  title: {
    absolute: "Popular Movies",
  },
  description: "Discover the popular movies!",
};

export default async function PopularMoviesPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const movies = await fetchData(
    `/movie/popular?language=en-US&page=${searchParams.page || 1}`
  ).then((res) => res.json());
  return (
    <>
      <PopularMovies data={movies} />
      <FetchedDetector />
    </>
  );
}
