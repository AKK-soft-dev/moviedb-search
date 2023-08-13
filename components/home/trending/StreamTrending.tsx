import fetchData from "@/config/fetch";
import TrendingDataDisplay from "./TrendingDataDisplay";

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(0), duration);
  });
}

export default async function StreamTrending() {
  const res = await fetchData("/trending/movie/day?language=en-US", {
    cache: "no-store",
  });

  await wait(1000);
  const trendingData = await res.json();
  return <TrendingDataDisplay data={trendingData} />;
}
