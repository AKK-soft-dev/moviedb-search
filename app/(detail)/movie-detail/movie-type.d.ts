export type MovieDetailType = {
  backdrop_path: string | null;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget: number | null;
  genres: Array<{ id: number; name: string }> | null;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string | null;
  original_title: string | null;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }> | null;
  release_date: string | null;
  revenue: number | null;
  runtime: number | null;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }> | null;
  status: string | null;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number | null;
  vote_count: number | null;
};
