//https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&release_date.gte=2023-08-15&release_date.lte=2023-08-15&sort_by=popularity.desc&with_release_type=2%7C3import fetchData from "@/config/fetch";
import { NextResponse } from "next/server";
import fetchData from "@/config/fetch";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  {
    params: { id, season_number },
  }: { params: { id: number; season_number: number } }
) {
  const uri = `/tv/${id}/season/${season_number}/videos?language=en-US`;

  const res = await fetchData(uri);
  const data = await res.json();
  // console.log("fetching trend data", { uri, data });
  return NextResponse.json(data);
}
