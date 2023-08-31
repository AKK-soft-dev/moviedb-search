import fetchData from "@/config/fetch";
import TrendingDataDisplay from "./TrendingDataDisplay";

export default async function StreamTrending() {
  const res = await fetchData("/trending/movie/day?language=en-US", {
    cache: "no-store",
  });

  const trendingData = await res.json();
  return <TrendingDataDisplay data={trendingData} />;
}
