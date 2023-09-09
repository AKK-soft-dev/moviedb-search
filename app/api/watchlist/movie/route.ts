import WatchListMovie from "@/models/watchlist-movie";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
import { WatchListMovieType } from "../watchlist-types";

export const GET = async () => {
  try {
    await connectToDB();

    const movies = await WatchListMovie.find({}).populate("creator");
    return new Response(JSON.stringify(movies), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all movies in watch list", {
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  const {
    userId,
    movie_id,
    title,
    release_date,
    poster_path,
    vote_average,
  }: WatchListMovieType = await req.json();

  try {
    await connectToDB();
    const movies = await WatchListMovie.find({
      creator: userId,
      movie_id,
    }).populate("creator");

    if (movies?.length)
      return new Response(
        JSON.stringify({ message: `Movie with id ${movie_id} already exists` }),
        {
          status: 409,
        }
      ); // Conflict status

    const newMovie = new WatchListMovie({
      creator: userId,
      movie_id,
      title,
      release_date,
      poster_path,
      vote_average,
    });
    const savedMovie = await newMovie.save();
    // await savedMovie.populate("creator");

    return new Response(JSON.stringify(savedMovie), { status: 201 });
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Failed to add movie to watch list!",
        serverMessage: (err as Error).message,
      }),
      { status: 500 }
    );
  }
};
