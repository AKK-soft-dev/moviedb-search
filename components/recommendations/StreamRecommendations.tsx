import fetchData from "@/config/fetch";
import RecommendationsDataDisplay from "./RecommendationsDataDisplay";

export default async function StreamRecommendations({
  id,
  type,
}: {
  id: number | string;
  type: "movie" | "tv";
}) {
  const res = await fetchData(
    `/${type}/${id}/recommendations?language=en-US&page=1`
  );
  const recommendations = await res.json();

  return <RecommendationsDataDisplay data={recommendations} />;
}
