import fetchData from "@/config/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  const res = await fetchData(
    `/search/multi?query=${_req.nextUrl.searchParams.get(
      "query"
    )}&include_adult=false&language=en-US&page=1`
  );
  console.log({ res });
  const data = await res.json();

  return NextResponse.json(data);
}
