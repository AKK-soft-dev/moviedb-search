import fetchData from "@/config/fetch";
import type { Metadata } from "next";
import NowPlayingMovies from "./NowPlayingMovies";
import FetchedDetector from "@/components/utils/FetchedAndPageLoadedDetector";

export const metadata: Metadata = {
  title: {
    absolute: "Now Playing Movies",
  },
  description: "Discover the now playing movies!",
};

export default async function NowPlayingMoviesPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const movies = await fetchData(
    `/movie/now_playing?language=en-US&page=${searchParams.page || 1}`
  ).then((res) => res.json());
  return (
    <>
      <NowPlayingMovies data={movies} />
      <FetchedDetector />
    </>
  );
}
