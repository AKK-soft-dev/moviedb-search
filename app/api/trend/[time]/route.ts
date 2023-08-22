import fetchData from "@/config/fetch";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { time: string } }
) {
  const uri = `/trending/movie/${params.time}?language=en-US`;

  const res = await fetchData(uri);
  const data = await res.json();
  return NextResponse.json(data);
}
