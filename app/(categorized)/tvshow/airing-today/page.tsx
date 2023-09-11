import fetchData from "@/config/fetch";
import type { Metadata } from "next";
import FetchedDetector from "@/components/utils/FetchedAndPageLoadedDetector";
import AiringTodayTVShows from "./AiringTodayTVShows";

export const metadata: Metadata = {
  title: {
    absolute: "TV Shows Airing Today",
  },
  description: "Discover the tv shows airing today!",
};

export default async function AiringTodayTVShowsPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const movies = await fetchData(
    `/tv/airing_today?language=en-US&page=${searchParams.page || 1}`
  ).then((res) => res.json());
  return (
    <>
      <AiringTodayTVShows data={movies} />
      <FetchedDetector />
    </>
  );
}
