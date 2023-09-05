"use client";
import {
  Box,
  Container,
  OutlinedInput,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDataQueryMagic } from "react-data-query";
import { searchIndicatorKey } from "../Navbar";
import GradientBackground from "../utils/GradientBackground";

export default function Hero({
  backgroundImageUrl,
}: {
  backgroundImageUrl: string;
}) {
  const theme = useTheme();
  const defaultBackground = theme.palette.background.default;
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { setQueryData } = useDataQueryMagic();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQueryData(searchIndicatorKey, () => true);
    router.push(`/search/v2?query=${query}`);
  };
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
      <GradientBackground
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300,
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

          <Box component="form" onSubmit={handleSubmit}>
            <OutlinedInput
              placeholder="Search movies, shows, and people"
              fullWidth
              sx={{ mt: 2 }}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              inputProps={{ inputMode: "search" }}
            />
          </Box>
        </Container>
      </GradientBackground>
    </Box>
  );
}
