import fetchData from "@/config/fetch";
import type { Metadata } from "next";
import { Box, Container, Typography, IconButton, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { notFound } from "next/navigation";
import { MovieDetailType } from "../movie-type";
import FetchedDetector from "@/components/utils/FetchedDetector";
import GradientBackground from "@/components/utils/GradientBackground";
import Media from "../../Media";
import CustomTooltip from "@/components/utils/CustomTooltip";

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
  const {
    title,
    backdrop_path,
    poster_path,
    tagline,
    overview,
    vote_average,
  }: MovieDetailType = await fetchData(`/movie/${movieID}`, {
    next: {
      revalidate: 1800,
    },
  }).then((res) => res.json());

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
            <Box>
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
                    sx={{ mt: { xs: 2, md: 0 } }}
                  />
                </Box>
                <Box component="div" className="col-12 col-md">
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {title}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      columnGap={2}
                      my={1}
                    >
                      <CustomTooltip title="User score">
                        <Box
                          component="div"
                          className="user_score-wrapper"
                          sx={{ position: "relative" }}
                        >
                          <Typography
                            className="user_score"
                            variant="body2"
                            component="span"
                            sx={{ typography: "h6" }}
                          >
                            {vote_average?.toFixed(1)}
                          </Typography>
                        </Box>
                      </CustomTooltip>

                      <CustomTooltip title="Add to watch list">
                        <IconButton color="primary">
                          <BookmarkIcon />
                        </IconButton>
                      </CustomTooltip>

                      <Button
                        startIcon={<PlayArrowIcon />}
                        variant="outlined"
                        size="small"
                      >
                        Play Trailer
                      </Button>
                    </Box>

                    <Typography color="text.secondary" my={2}>
                      {tagline}
                    </Typography>
                    <Box my={2}>
                      <Typography variant="h6">Overview</Typography>
                      <Typography color="action.active" fontWeight={300}>
                        {overview}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </GradientBackground>
      </Box>
      <FetchedDetector />
    </Box>
  );
}
