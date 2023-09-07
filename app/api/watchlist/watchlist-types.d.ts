export type WatchListMovieType = {
  userId: string;
  movie_id: number | string;
  poster_path: string | null;
  title: string;
  release_date: string | null;
};

export type WatchListTVShowType = {
  userId: string;
  tvshow_id: number | string;
  poster_path: string | null;
  name: string;
  first_air_date: string | null;
};
