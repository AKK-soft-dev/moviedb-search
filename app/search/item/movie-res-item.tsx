import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import CustomTooltip from "../custom-tooltip";

export default function MovieResultItem({
  movie,
}: {
  movie: {
    backdrop_path: string;
    vote_average: number;
    title: string;
    original_title: string;
    overview: string;
    genre_ids: number[];
    release_date: string;
    original_language: string;
  };
}) {
  const {
    backdrop_path,
    vote_average,
    title,
    original_title,
    overview,
    genre_ids,
    release_date,
    original_language,
  } = movie;
  const imgSrc = `https://image.tmdb.org/t/p/w1280${backdrop_path}`;
  return (
    <Card sx={{ width: 1 }} component="div" title={original_title}>
      {backdrop_path ? (
        <CardMedia
          component="img"
          src={imgSrc}
          sx={{ height: { xs: 170, sm: 200, md: 220, lg: 240, xl: 250 } }}
          alt={original_title}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 1,
            height: { xs: 170, sm: 200, md: 220, lg: 240, xl: 250 },
          }}
        >
          <ImageNotSupportedIcon fontSize="large" />
        </Box>
      )}

      <CardContent>
        <Typography noWrap>{title}</Typography>
        <Typography
          component="span"
          noWrap
          color="text.secondary"
          display="block"
          sx={{ fontSize: (theme) => theme.typography.caption.fontSize }}
        >
          OT - {original_title}
        </Typography>
        <Box sx={{ display: "flex", my: 2 }}>
          <Box
            component="div"
            className="imdb-wrapper"
            sx={{
              position: "relative",
              background: (theme) => theme.palette.background.default,
            }}
          >
            <Typography className="imdb" variant="body2" component="span">
              {vote_average.toFixed(1)}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <CustomTooltip
            title={
              <>
                <Typography component="h6">Overview</Typography>
                <Divider sx={{ my: 0.7 }} />
                {overview}
              </>
            }
          >
            <Typography variant="body2" noWrap>
              {overview}
            </Typography>
          </CustomTooltip>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button>View Details</Button>
      </CardActions>
    </Card>
  );
}
