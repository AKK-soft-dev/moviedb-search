import WatchListMovie from "@/models/watchlist-movie";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

type ParamsType = {
  id: string;
};

export const GET = async (
  _req: NextRequest,
  { params: { id } }: { params: ParamsType }
) => {
  try {
    await connectToDB();
    const movie = await WatchListMovie.findById(id).populate("creator");
    return new Response(JSON.stringify(movie), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all movies in watch list", {
      status: 500,
    });
  }
};

export const DELETE = async (
  _req: NextRequest,
  { params: { id } }: { params: ParamsType }
) => {
  try {
    await connectToDB();

    // Find the movie in watch list by ID and remove it
    await WatchListMovie.findByIdAndRemove(id);

    return new Response("Movie in watch list deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error deleting movie", { status: 500 });
  }
};
