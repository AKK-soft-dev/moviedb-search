import { formatDisplayDate } from "@/utils/format-date";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

type VideoItemProps = {
  movie: {
    poster_path: string;
    title: string;
    original_title: string;
    vote_average: number;
    release_date: string;
  };
};
export default function MovieItem({
  movie: { poster_path, title, original_title, vote_average, release_date },
}: VideoItemProps) {
  const imgSrc = `https://image.tmdb.org/t/p/w300${poster_path}`;
  return (
    <Box mb={4}>
      <Box
        sx={{
          display: "flex",
          width: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 170, sm: 200, md: 220, lg: 240, xl: 250 },
          }}
        >
          <Image
            src={imgSrc}
            style={{ objectFit: "cover" }}
            alt={original_title}
            title={title}
            fill
          />
          <Box component="div" className="imdb-wrapper">
            <Typography className="imdb" variant="body2" component="span">
              {vote_average.toFixed(1)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 1, width: 1 }}>
          <Typography
            variant="body1"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2">
            {formatDisplayDate(release_date)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
