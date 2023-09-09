import WatchListTVShow from "@/models/watchlist-tvshow";
import { connectToDB } from "@/utils/database";
import { WatchListTVShowType } from "../watchlist-types";
import { NextRequest } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();

    const tvShows = await WatchListTVShow.find({}).populate("creator");
    return new Response(JSON.stringify(tvShows), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all tv shows in watch list", {
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  const {
    userId,
    tvshow_id,
    name,
    first_air_date,
    poster_path,
    vote_average,
  }: WatchListTVShowType = await req.json();

  try {
    await connectToDB();

    const tvShows = await WatchListTVShow.find({
      creator: userId,
      tvshow_id,
    }).populate("creator");

    if (tvShows?.length)
      return new Response(
        JSON.stringify({
          message: `TV Show with id ${tvshow_id} already exists`,
        }),
        {
          status: 409,
        }
      ); // Conflict status

    const newTVShow = new WatchListTVShow({
      creator: userId,
      tvshow_id,
      name,
      first_air_date,
      poster_path,
      vote_average,
    });
    const savedTVShow = await newTVShow.save();
    // await savedTVShow.populate("creator");

    return new Response(JSON.stringify(savedTVShow), { status: 201 });
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Failed to add tv show to watch list!",
        serverMessage: (err as Error).message,
      }),
      { status: 500 }
    );
  }
};
