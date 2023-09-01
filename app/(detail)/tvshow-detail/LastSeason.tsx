"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { SeasonType } from "./tvshow-type";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";
import Image from "next/image";
import BSGridItem from "@/components/utils/items/BSGridItem";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

export default function LastSeason({
  tvShowId,
  data: { poster_path, name, episode_count, vote_average, air_date, overview },
}: {
  tvShowId: string;
  data: SeasonType;
}) {
  const imgSrc = `https://image.tmdb.org/t/p/w300${poster_path}`;
  const { openLoadingIndicator } = useLoadingIndicatorToggler();
  const airDate = air_date ? new Date(air_date) : null;
  return (
    <Box
      component="section"
      sx={{ backgroundColor: "background.paper", py: 5 }}
    >
      <Container>
        <Box
          display="flex"
          mb={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h5"
            fontWeight={500}
            display="inline-block"
            sx={{
              borderBottom: "3px solid",
              borderBottomColor: "secondary.main",
            }}
          >
            Last Season
          </Typography>
          <Button
            LinkComponent={Link}
            href={`${tvShowId}/seasons`}
            onClick={openLoadingIndicator}
          >
            View All Seasons
          </Button>
        </Box>
        <Box my={2}>
          <Box component="div" className="row">
            <BSGridItem>
              <Box
                onClick={openLoadingIndicator}
                sx={{
                  position: "relative",
                  width: "100%",
                  backgroundColor: "background.default",
                  height: { xs: 170, sm: 200, md: 220, lg: 240, xl: 250 },
                }}
              >
                {poster_path ? (
                  <Image
                    src={imgSrc}
                    style={{ objectFit: "cover", borderRadius: 6 }}
                    alt={name}
                    title={name}
                    fill
                  />
                ) : (
                  <Box
                    width={1}
                    height={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      color: "text.primary",
                    }}
                  >
                    <ImageNotSupportedIcon fontSize="large" />
                  </Box>
                )}
              </Box>
            </BSGridItem>
            <Box component="div" className="col">
              <Box height={1}>
                <Typography variant="h6">{name}</Typography>
                <Box display="flex" alignItems="center" gap={1} my={1}>
                  <Box
                    component="div"
                    className="user_score-wrapper"
                    sx={{ position: "static" }}
                  >
                    <Typography
                      className="user_score"
                      variant="body2"
                      component="span"
                    >
                      {vote_average.toFixed(1)}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {air_date ? `• ${air_date.replaceAll("-", "/")}` : ""}{" "}
                    {episode_count ? `• ${episode_count} Episodes` : ""}
                  </Typography>
                </Box>
                <Typography color="action.active" fontWeight={300}>
                  {overview || "Overview not available!"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
