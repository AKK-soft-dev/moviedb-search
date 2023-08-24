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

export default function TVShowResultItem({
  tv,
}: {
  tv: {
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    name: string;
    original_name: string;
    overview: string;
    genre_ids: number[];
    release_date: string;
    original_language: string;
  };
}) {
  const {
    backdrop_path,
    poster_path,
    vote_average,
    name,
    original_name,
    overview,
    genre_ids,
    release_date,
    original_language,
  } = tv;
  const backdropImgSrc = `https://image.tmdb.org/t/p/w1280${backdrop_path}`;
  const posterImgSrc = `https://image.tmdb.org/t/p/w780${poster_path}`;
  return (
    <Card sx={{ width: 1 }} component="div">
      {/* {backdrop_path || poster_path ? (
        <CardMedia
          component="img"
          src={backdropImgSrc || posterImgSrc}
          sx={{ height: { xs: 220, sm: 240, md: 250, lg: 260, xl: 270 } }}
          alt={original_name}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 1,
            height: { xs: 220, sm: 240, md: 250, lg: 260, xl: 270 },
          }}
        >
          <ImageNotSupportedIcon fontSize="large" />
        </Box>
      )} */}
      <CardMedia
        component="img"
        src={backdrop_path ? backdropImgSrc : posterImgSrc}
        sx={{ height: { xs: 220, sm: 240, md: 250, lg: 260, xl: 270 } }}
        alt={original_name}
      />

      <CardContent>
        <Typography noWrap>{name}</Typography>
        <Typography
          variant="caption"
          noWrap
          color="text.secondary"
          display="block"
          sx={{ fontSize: (theme) => theme.typography.caption.fontSize }}
        >
          OT - {original_name}
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
