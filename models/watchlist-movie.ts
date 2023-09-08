import { Schema, model, models } from "mongoose";

const WatchListMovieSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  movie_id: {
    type: Number,
    required: [true, "Movie's id is required."],
  },
  title: {
    type: String,
    required: [true, "Movie's title is required."],
  },
  poster_path: {
    type: String,
  },
  vote_average: {
    type: Number,
  },
  release_date: {
    type: String,
  },
});

const WatchListMovie =
  models.WatchListMovie || model("WatchListMovie", WatchListMovieSchema);

export default WatchListMovie;
