import fetchData from "@/config/fetch";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MovieDetailType } from "../movie-type";
type Props = {
  params: { id: string };
};

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const trendMoviesResult = await fetchData(
    "/trending/movie/day?language=en-US"
  ).then((res) => res.json());
  const trendMovies = trendMoviesResult?.results;

  return trendMovies.map(({ id, title }: any) => ({
    id: `${id}-${title.toLowerCase().replaceAll(" ", "-")}`,
  }));
}

export const generateMetadata = async ({
  params: { id },
}: Props): Promise<Metadata> => {
  const movieID = id.split("-")[0];
  const movie: MovieDetailType = await fetchData(`/movie/${movieID}`).then(
    (res) => {
      if (!res.ok) {
        notFound();
      }
      return res.json();
    }
  );

  const movieTitle = movie.title;
  const movieDescription =
    movie?.overview || movie?.tagline || "Movie description";
  const backdropPath = movie.backdrop_path;

  return {
    title: movieTitle,
    description: movieDescription,
    openGraph: {
      title: movieTitle,
      description: movieDescription,
      images: backdropPath
        ? `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`
        : "/opengraph-image.png",
    },
  };
};

export default async function Movie({ params: { id } }: Props) {
  const movieID = id.split("-")[0];
  const movie: MovieDetailType = await fetchData(`/movie/${movieID}`).then(
    (res) => res.json()
  );
  return <h1>{movie.title}</h1>;
}
