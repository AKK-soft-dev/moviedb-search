type LastEpisodeToAirType = {
  id: number;
  name: string;
  overview: string | null;
  vote_average: number | null;
  vote_count: number | null;
  air_date: string | null;
  episode_number: number;
  episode_type: string;
  production_code: string | null;
  runtime: null;
  season_number: number;
  show_id: number; // same as tv show id
  still_path: string | null;
};

export type SeasonType = {
  air_date: string | null;
  episode_count: number;
  id: 8888;
  name: string;
  overview: string | null;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
};

export type SeasonsType = Array<SeasonType>;

export type TVShowDetailType = {
  adult: boolean;
  backdrop_path: string | null;
  created_by: Array<{
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }>;
  episode_run_time: number[] | null;
  first_air_date: string | null;
  genres: Array<{ id: number; name: string }> | null;
  homepage: string | null;
  id: number;
  in_production: boolean;
  languages: string[] | null;
  last_air_date: string | null;
  last_episode_to_air: LastEpisodeToAirType;
  name: string;
  next_episode_to_air: null; // need to define this type
  networks: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string | null;
  }> | null;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[] | null;
  original_language: string | null;
  original_name: string | null;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }> | null;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }> | null;
  seasons: SeasonsType;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }> | null;
  status: string | null;
  tagline: string | null;
  type: string | null;
  vote_average: number;
  vote_count: number;
};
