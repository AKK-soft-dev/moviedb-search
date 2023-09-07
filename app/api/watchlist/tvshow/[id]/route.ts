import WatchListTVShow from "@/models/watchlist-tvshow";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

type ParamsType = {
  id: string;
};

export const DELETE = async (
  _req: NextRequest,
  { params: { id } }: { params: ParamsType }
) => {
  try {
    await connectToDB();

    // Find the tv show in watch list by ID and remove it
    await WatchListTVShow.findByIdAndRemove(id);

    return new Response("TV show in watch list deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error deleting tv show", { status: 500 });
  }
};
