"use client";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { SeasonType } from "./tvshow-type";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";
import Image from "next/image";
import BSGridItem from "@/components/utils/items/BSGridItem";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { formatDisplayDate } from "@/utils/format-date";
import PlayTrailerButton from "@/components/utils/PlayTrailerButton";
import { useState } from "react";

export default function SeasonOverviewItem({
  tvShowId,
  tvShowName,
  imgBgDefault,
  showPremiereDesc,
  data: {
    name,
    overview,
    air_date,
    vote_average,
    episode_count,
    season_number,
    poster_path,
  },
}: {
  tvShowId: string;
  imgBgDefault?: boolean;
  tvShowName: string;
  data: SeasonType;
  showPremiereDesc?: boolean;
}) {
  const imgSrc = `https://image.tmdb.org/t/p/w300${poster_path}`;
  const premiereDesc = `Season ${season_number} of ${tvShowName} premiered on ${formatDisplayDate(
    air_date!
  )}`;
  const { openLoadingIndicator } = useLoadingIndicatorToggler();
  const [readMore, setReadMore] = useState(false);

  const overviewLength = overview?.length || 0;
  const exceedMaxLength = overviewLength > 170;

  const overviewWithReadMore = (
    <>
      {overview &&
        (exceedMaxLength ? (
          <>
            {overview.slice(0, 150)}...
            <Typography
              variant="body1"
              onClick={() => setReadMore(true)}
              sx={{
                display: "inline-block",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Read more
            </Typography>
          </>
        ) : (
          overview
        ))}
    </>
  );

  const overviewWithReadLess = (
    <>
      {overview &&
        (exceedMaxLength ? (
          <>
            {overview}{" "}
            <Typography
              variant="body1"
              onClick={() => setReadMore(false)}
              sx={{
                display: "inline-block",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Read less
            </Typography>
          </>
        ) : (
          overview
        ))}
    </>
  );

  return (
    <Box my={2}>
      <Box component="div" className="row">
        <BSGridItem>
          <Box
            component={Link}
            onClick={openLoadingIndicator}
            href={`/tvshow-detail/${tvShowId}/season/${season_number}`}
            sx={{
              display: "block",
              position: "relative",
              width: "100%",
              backgroundColor: imgBgDefault
                ? "background.default"
                : "background.paper",
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
                {air_date
                  ? `${
                      showPremiereDesc
                        ? new Date(air_date).getFullYear()
                        : air_date.replaceAll("-", "/")
                    }`
                  : ""}{" "}
                {episode_count ? `• ${episode_count} Episodes` : ""}
              </Typography>
            </Box>
            {showPremiereDesc && (
              <Typography color="action.active" my={2} fontWeight={400}>
                {premiereDesc}
              </Typography>
            )}
            <Typography color="action.active" fontWeight={300}>
              {overview
                ? readMore
                  ? overviewWithReadLess
                  : overviewWithReadMore
                : !showPremiereDesc && premiereDesc}
            </Typography>
            <PlayTrailerButton sx={{ mt: 1 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
