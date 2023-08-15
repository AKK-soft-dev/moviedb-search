import fetchData from "@/config/fetch";
import PopularDataDisplay from "./PopularDataDisplay";
import formatDate from "@/utils/format-date";

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(0), duration);
  });
}

export default async function StreamPopular() {
  const res = await fetch(
    `/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&release_date.lte=${formatDate(
      new Date()
    )}&sort_by=popularity.desc&with_release_type=4`,
    {
      cache: "no-store",
    }
  );

  await wait(1000);
  const popularData = await res.json();
  return <PopularDataDisplay data={popularData} />;
}
