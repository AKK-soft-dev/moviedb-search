"use client";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { formatDisplayDate } from "@/utils/format-date";
import { EpisodeType } from "./[id]/season/season-type";
import PlayTrailerButton from "@/components/utils/PlayTrailerButton";
import { useState } from "react";

export default function EpisodeOverviewItem({
  seasonName,
  data: {
    name,
    overview,
    air_date,
    vote_average,
    episode_number,
    still_path,
    runtime,
  },
}: {
  seasonName: string;
  data: EpisodeType;
}) {
  const imgSrc = `https://image.tmdb.org/t/p/w1280${still_path}`;
  const premiereDesc = `Episode ${episode_number} of ${seasonName} premiered on ${formatDisplayDate(
    air_date!
  )}`;
  const [readMore, setReadMore] = useState(false);
  let duration = "N/A";
  if (runtime) {
    const t = (runtime / 60).toString();
    const hour = parseInt(t);
    const minute = runtime % 60;
    duration = `${hour ? hour + "h" : ""} ${minute ? minute + "m" : ""}`;
  }

  const overviewLength = overview?.length || 0;
  const exceedMaxLength = overviewLength > 150;

  const overviewWithReadMore = (
    <>
      {overview &&
        (exceedMaxLength ? (
          <>
            {overview.slice(0, 130)}...
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
    <Card sx={{ height: 1 }}>
      {still_path ? (
        <CardMedia
          image={imgSrc}
          sx={{
            height: { xs: 220, sm: 300, md: 220 },
            backgroundColor: "background.default",
          }}
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            border: 2,
            borderColor: "background.paper",
            backgroundColor: "background.default",
            color: "text.primary",
            height: { xs: 220, sm: 300, md: 220 },
          }}
        >
          <ImageNotSupportedIcon />
        </Box>
      )}

      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Box display="flex" alignItems="center" gap={1} my={1}>
          <Box
            component="div"
            className="user_score-wrapper"
            sx={{ position: "static" }}
          >
            <Typography className="user_score" variant="body2" component="span">
              {vote_average.toFixed(1)}
            </Typography>
          </Box>
          <Typography variant="body2">
            {formatDisplayDate(air_date)} {runtime ? `• ${duration}` : ""}
          </Typography>
        </Box>
        <PlayTrailerButton sx={{ my: 1 }} />
        <Typography color="action.active" fontWeight={300}>
          {overview
            ? readMore
              ? overviewWithReadLess
              : overviewWithReadMore
            : premiereDesc}
        </Typography>
      </CardContent>
    </Card>
  );
}
