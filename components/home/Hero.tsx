"use client";
import {
  Box,
  Container,
  OutlinedInput,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

export default function Hero({
  backgroundImageUrl,
}: {
  backgroundImageUrl: string;
}) {
  const theme = useTheme();
  const defaultBackground = theme.palette.background.default;
  return (
    <Box
      component="section"
      className="background-ani"
      sx={{
        backgroundImage: `url(${
          backgroundImageUrl
            ? `https://image.tmdb.org/t/p/w1280${backgroundImageUrl}`
            : "/backdrop.jpg"
        })`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          minHeight: 300,
          backgroundImage: `linear-gradient(to right, ${alpha(
            defaultBackground,
            0.8
          )} 0%, ${alpha(defaultBackground, 0.8)} 100%)`,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container fixed>
          <Typography
            variant="h3"
            className="text-gradient-util"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, #ff4345, ${theme.palette.secondary.light})`,
            }}
          >
            <Box component="span">Explore</Box> the Cinematic Universe
          </Typography>
          <Typography variant="h5" sx={{ color: "text.secondary" }}>
            Discover a World of Movies and TV Shows at Your Fingertips
          </Typography>

          <Box component="form">
            <OutlinedInput
              placeholder="Search movies, shows, and people"
              fullWidth
              sx={{ mt: 2 }}
              inputProps={{ inputMode: "search" }}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
