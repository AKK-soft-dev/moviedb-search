import fetchData from "@/config/fetch";
import PopularDataDisplay from "./PopularDataDisplay";

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(0), duration);
  });
}

export default async function StreamPopular() {
  const res = await fetch("http://localhost:3000/api/popular/digital", {
    cache: "no-store",
  });

  await wait(1000);
  const popularData = await res.json();
  return <PopularDataDisplay data={popularData} />;
}
