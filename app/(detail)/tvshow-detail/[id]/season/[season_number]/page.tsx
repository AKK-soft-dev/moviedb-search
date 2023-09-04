import { Metadata } from "next";
import { notFound } from "next/navigation";
import fetchData from "@/config/fetch";
import { Box, Typography, Container, Grid } from "@mui/material";
import Link from "next/link";
import FetchedDetector from "@/components/utils/FetchedDetector";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SeasonDetailType } from "../season-type";
import EpisodeOverviewItem from "../../../EpisodeOverviewItem";
import { TVShowDetailType } from "../../../tvshow-type";

type Props = {
  params: { id: string; season_number: string };
};

/*
  REMINDER
  ========

  Don't forget to implement generateStaticParams
*/

// export async function generateStaticParams({
//   params: { id },
// }: {
//   params: {
//     id: string;
//   };
// }): Promise<{ season_number: string }[]> {
//   console.log({ id });
//   const tvShowId = id.split("-")[0];
//   const tvShow: TVShowDetailType = await fetchData(`/tv/${tvShowId}`).then(
//     (res) => res.json()
//   );

//   const seasons = tvShow.seasons;

//   return seasons.map(({ season_number }) => ({
//     season_number: season_number.toString(),
//   }));
// }

export const generateMetadata = async ({
  params: { id, season_number },
}: Props): Promise<Metadata> => {
  const tvShowId = id.split("-")[0];
  const season: SeasonDetailType = await fetchData(
    `/tv/${tvShowId}/season/${season_number}?language=en-US`
  ).then((res) => {
    if (!res.ok) {
      notFound();
    }
    return res.json();
  });

  const tvShowName = id
    ?.split("-")
    .slice(1)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(" ");
  const seasonName = season.name;
  const seasonDescription =
    season?.overview || `Explore the ${seasonName} of ${tvShowName}`;
  const backdropPath = season.poster_path;
  const title = `${seasonName} of ${tvShowName}`;

  return {
    title,
    description: seasonDescription,
    openGraph: {
      title,
      description: seasonDescription,
      images: backdropPath
        ? `https://image.tmdb.org/t/p/w1280/${backdropPath}`
        : "/opengraph-image.png",
    },
  };
};

export default async function Seasons({
  params: { id, season_number },
}: Props) {
  const tvShowId = id.split("-")[0];
  const { name, episodes, air_date }: SeasonDetailType = await fetchData(
    `/tv/${tvShowId}/season/${season_number}?language=en-US`,
    { next: { revalidate: 3600 } }
  ).then((res) => res.json());

  return (
    <>
      <Container>
        <Box mt={2} mb={4}>
          <Typography variant="h4" mb={1} fontWeight={700}>
            {name} ({new Date(air_date).getFullYear()}){" "}
          </Typography>
          <Box display="inline-block">
            <Typography
              component={Link}
              href={`/tvshow-detail/${id}/seasons`}
              display="flex"
              alignItems="center"
              columnGap={1}
              color="primary"
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <ArrowBackIcon />
              Back to season list
            </Typography>
          </Box>
        </Box>
        <Box my={4}>
          <Grid container spacing={{ xs: 1, md: 2 }}>
            {episodes?.map((episode) => (
              <Grid item xs={12} md={6} lg={4} key={episode.id}>
                <EpisodeOverviewItem seasonName={name} data={episode} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <FetchedDetector />
    </>
  );
}
