import fetchData from "@/config/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  const searchParams = _req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const page = searchParams.get("p") || 1;
  const res = await fetchData(
    `/search/person?query=${query}&include_adult=false&language=en-US&page=${page}`
  );
  // console.log({ res });
  const data = await res.json();

  return NextResponse.json(data);
}
