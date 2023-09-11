import fetchData from "@/config/fetch";
import type { Metadata } from "next";
import FetchedDetector from "@/components/utils/FetchedAndPageLoadedDetector";
import TopRatedTVShows from "./TopRatedTVShows";

export const metadata: Metadata = {
  title: {
    absolute: "Top Rated TV Shows",
  },
  description: "Discover the top rated tv shows!",
};

export default async function TopRatedTVShowsPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const movies = await fetchData(
    `/tv/top_rated?language=en-US&page=${searchParams.page || 1}`
  ).then((res) => res.json());
  return (
    <>
      <TopRatedTVShows data={movies} />
      <FetchedDetector />
    </>
  );
}
