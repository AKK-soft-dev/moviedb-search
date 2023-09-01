import fetchData from "@/config/fetch";
import RecommendationsDataDisplay from "./RecommendationsDataDisplay";

export type RecommendationsType = "movie" | "tv";
export default async function StreamRecommendations({
  id,
  type,
}: {
  id: number | string;
  type: RecommendationsType;
}) {
  const res = await fetchData(
    `/${type}/${id}/recommendations?language=en-US&page=1`
  );
  const recommendations = await res.json();

  return <RecommendationsDataDisplay type={type} data={recommendations} />;
}
