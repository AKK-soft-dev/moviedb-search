import fetchData from "@/config/fetch";
import type { Metadata } from "next";
import { Box, Container, Typography, Button, Chip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { notFound } from "next/navigation";
import { MovieDetailType } from "../movie-type";
import FetchedDetector from "@/components/utils/FetchedDetector";
import GradientBackground from "@/components/utils/GradientBackground";
import Media from "../../Media";
import AddToWatchListButton from "@/components/utils/AddToWatchListButton";
import { CreditsType, CrewType } from "@/components/utils/Credits";
import Casts, { CastsType } from "@/components/utils/Casts";
import Recommendations from "@/components/recommendations/Recommendations";
import { Suspense } from "react";
import SingleRowSkeleton from "@/components/skeletons/SingleRowSkeleton";
import StreamRecommendations from "@/components/recommendations/StreamRecommendations";

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
        ? `https://image.tmdb.org/t/p/w1280/${backdropPath}`
        : "/opengraph-image.png",
    },
  };
};

export const revalidate = 1800;

export default async function Movie({ params: { id } }: Props) {
  const movieID = id.split("-")[0];
  const {
    title,
    backdrop_path,
    poster_path,
    tagline,
    overview,
    vote_average,
    runtime,
    genres,
    release_date,
    budget,
    spoken_languages,
    status,
  }: MovieDetailType = await fetchData(`/movie/${movieID}`).then((res) =>
    res.json()
  );

  const credits: CreditsType = await fetchData(
    `/movie/${movieID}/credits?language=en-US`
  ).then((res) => res.json());

  const casts: CastsType = credits.cast;
  const director: CrewType | undefined = credits.crew.find(
    (c) => c.job === "Director"
  );

  let duration = "N/A";
  if (runtime) {
    const t = (runtime / 60).toString();
    const hour = parseInt(t);
    const minute = runtime % 60;
    duration = `${hour ? hour + "h" : ""} ${minute ? minute + "m" : ""}`;
  }

  return (
    <Box position="relative">
      <Box
        component="div"
        className="background-ani"
        sx={{
          width: 1,
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          borderBottom: "solid 1px",
          borderBottomColor: "primary.main",
        }}
      >
        <GradientBackground
          darker
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: 350,
          }}
        >
          <Container>
            <Box my={{ xs: 0, md: 2 }}>
              <Box component="div" className="row g-5">
                <Box
                  component="div"
                  className="col-12 col-md-auto"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Media
                    poster_path={poster_path}
                    alt={title}
                    sx={{ my: { xs: 2, md: 0 } }}
                  />
                </Box>
                <Box component="div" className="col-12 col-md">
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {title}
                    </Typography>

                    <Box my={1}>
                      <Typography variant="body2">
                        {release_date?.replaceAll("-", "/")}{" "}
                        {budget ? `• $${budget?.toLocaleString()}` : ""}{" "}
                        {status ? `• ${status}` : ""}{" "}
                        {spoken_languages && spoken_languages.length > 0
                          ? `• ${spoken_languages
                              .map((sp) => sp.english_name)
                              .join(", ")}`
                          : ""}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      flexWrap="wrap"
                      columnGap={1}
                      my={1}
                    >
                      {genres?.map((genre) => (
                        <Chip
                          size="small"
                          key={genre.id}
                          label={genre.name}
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      columnGap={1}
                      my={2}
                    >
                      <Chip
                        label={vote_average?.toFixed(1)}
                        color="secondary"
                      />
                      <Chip label={duration} color="primary" />

                      <AddToWatchListButton />

                      <Button
                        startIcon={<PlayArrowIcon />}
                        color="inherit"
                        variant="outlined"
                      >
                        Play Trailer
                      </Button>
                    </Box>

                    <Typography color="text.secondary" my={2}>
                      {tagline}
                    </Typography>
                    <Box my={2}>
                      {overview && (
                        <>
                          <Typography variant="h6">Overview</Typography>
                          <Typography color="action.active" fontWeight={300}>
                            {overview}
                          </Typography>
                        </>
                      )}
                      <Box my={2}>
                        <Typography>
                          Director : {director?.name ? director.name : "N/A"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </GradientBackground>
      </Box>

      <Casts casts={casts} id={id} />

      <Recommendations>
        <Suspense fallback={<SingleRowSkeleton />}>
          <StreamRecommendations type="movie" id={movieID} />
        </Suspense>
      </Recommendations>
      <FetchedDetector />
    </Box>
  );
}
