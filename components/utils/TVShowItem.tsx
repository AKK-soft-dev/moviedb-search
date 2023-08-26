import { formatDisplayDate } from "@/utils/format-date";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import Link from "next/link";

type TVShowItemProps = {
  data: {
    id: number;
    poster_path: string;
    name: string;
    original_name: string;
    vote_average: number;
    first_air_date: string;
  };
};
export default function MovieItem({
  data: { id, poster_path, name, original_name, vote_average, first_air_date },
}: TVShowItemProps) {
  const imgSrc = `https://image.tmdb.org/t/p/w300${poster_path}`;
  const tvShowLink = `/tvshow/${id}-${name.toLowerCase().split(" ").join("-")}`;
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
          component={Link}
          href={tvShowLink}
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 170, sm: 200, md: 220, lg: 240, xl: 250 },
          }}
        >
          {poster_path ? (
            <Image
              src={imgSrc}
              style={{ objectFit: "cover" }}
              alt={original_name}
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
                background: (theme) => theme.palette.background.paper,
                color: "text.primary",
              }}
            >
              <ImageNotSupportedIcon fontSize="large" />
            </Box>
          )}
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
            {name}
          </Typography>
          <Typography variant="body2">
            {first_air_date && formatDisplayDate(first_air_date)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
