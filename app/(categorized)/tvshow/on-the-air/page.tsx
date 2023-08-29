import fetchData from "@/config/fetch";
import type { Metadata } from "next";
import FetchedDetector from "@/components/utils/FetchedDetector";
import OnTheAirTVShows from "./OnTheAirTVShows";

export const metadata: Metadata = {
  title: {
    absolute: "Currently Airing TV Shows",
  },
  description: "Discover the currently airing tv shows!",
};

export default async function OnTheAirTVShowsPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const movies = await fetchData(
    `/tv/on_the_air?language=en-US&page=${searchParams.page || 1}`
  ).then((res) => res.json());
  return (
    <>
      <OnTheAirTVShows data={movies} />
      <FetchedDetector />
    </>
  );
}
