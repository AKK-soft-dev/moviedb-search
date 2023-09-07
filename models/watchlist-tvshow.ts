import { Schema, model, models } from "mongoose";

const WatchListTVShowSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tvshow_id: {
    type: Number,
    required: [true, "TV show's id is required."],
  },
  name: {
    type: String,
    required: [true, "TV show's name is required."],
  },
  poster_path: {
    type: String,
  },
  first_air_date: {
    type: String,
  },
});

const WatchListTVShow =
  models.WatchListTVShow || model("WatchListTVShow", WatchListTVShowSchema);

export default WatchListTVShow;
