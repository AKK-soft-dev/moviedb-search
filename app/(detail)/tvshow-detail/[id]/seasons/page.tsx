import { Metadata } from "next";
import { TVShowDetailType } from "../../tvshow-type";
import { notFound } from "next/navigation";
import fetchData from "@/config/fetch";
import { Box, Typography, Container, Divider } from "@mui/material";
import SeasonOverviewItem from "../../SeasonOveriewItem";
import FetchedDetector from "@/components/utils/FetchedAndPageLoadedDetector";
import BackLink from "../../BackLink";

type Props = {
  params: { id: string };
};

export const generateMetadata = async ({
  params: { id },
}: Props): Promise<Metadata> => {
  const tvShowId = id.split("-")[0];
  const tvShow: TVShowDetailType = await fetchData(`/tv/${tvShowId}`).then(
    (res) => {
      if (!res.ok) {
        notFound();
      }
      return res.json();
    }
  );

  const tvShowName = tvShow.name;
  const tvShowDescription = `Explore all seasons of ${tvShowName}`;
  const backdropPath = tvShow.backdrop_path;

  return {
    title: `Seasons of ${tvShowName}`,
    description: tvShowDescription,
    openGraph: {
      title: tvShowName,
      description: tvShowDescription,
      images: backdropPath
        ? `https://image.tmdb.org/t/p/w1280/${backdropPath}`
        : "/opengraph-image.png",
    },
  };
};

export default async function Seasons({ params: { id } }: Props) {
  const tvShowId = id.split("-")[0];
  const { name, seasons, first_air_date }: TVShowDetailType = await fetchData(
    `/tv/${tvShowId}`,
    { next: { revalidate: 3600 } }
  ).then((res) => res.json());

  console.log("generating pages for seasons of", id);

  return (
    <>
      <Container>
        <Box mt={2} mb={4}>
          <Typography variant="h4" mb={1} fontWeight={700}>
            {name} ({new Date(first_air_date).getFullYear()}){" "}
          </Typography>
          <BackLink href={`/tvshow-detail/${id}`}>Back to main</BackLink>
        </Box>
        <Box my={4}>
          {seasons
            ?.filter((season) => season.name !== "Specials")
            .map((season) => (
              <>
                <SeasonOverviewItem
                  tvShowId={id}
                  showPremiereDesc
                  tvShowName={name}
                  data={season}
                  key={season.id}
                  imgBgDefault={false}
                />
                <Divider
                  sx={{
                    "&:last-child": {
                      display: "none",
                    },
                  }}
                />
              </>
            ))}
        </Box>
      </Container>
      <FetchedDetector />
    </>
  );
}
