import fetchData from "@/config/fetch";
import type { Metadata } from "next";
import FetchedDetector from "@/components/utils/FetchedDetector";
import PopularPeople from "./PopularPeople";

export const metadata: Metadata = {
  title: {
    absolute: "Popular People",
  },
  description: "Discover the popular people!",
};

export default async function PopularTVShowsPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const people = await fetchData(
    `/person/popular?language=en-US&page=${searchParams.page || 1}`
  ).then((res) => res.json());
  return (
    <>
      <PopularPeople data={people} />
      <FetchedDetector />
    </>
  );
}
