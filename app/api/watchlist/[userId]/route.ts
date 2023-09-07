import WatchListMovie from "@/models/watchlist-movie";
import WatchListTVShow from "@/models/watchlist-tvshow";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

type ParamsType = {
  userId: number;
};

export const GET = async (
  _req: NextRequest,
  { params: { userId } }: { params: ParamsType }
) => {
  try {
    await connectToDB();

    const movies = await WatchListMovie.find({ creator: userId }).populate(
      "creator"
    );
    const tvShows = await WatchListTVShow.find({ creator: userId }).populate(
      "creator"
    );
    if (!movies && !tvShows)
      return new Response("Movies and TV shows Not Found", { status: 404 });

    return new Response(JSON.stringify({ movies, tvShows }), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
