import fetchData from "@/config/fetch";
import PopularDataDisplay from "./PopularDataDisplay";
import formatDate from "@/utils/format-date";

export default async function StreamPopular() {
  const res = await fetchData(
    `/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&release_date.lte=${formatDate(
      new Date()
    )}&sort_by=popularity.desc&with_release_type=4`,
    {
      cache: "no-store",
    }
  );

  const popularData = await res.json();
  return <PopularDataDisplay data={popularData} />;
}
