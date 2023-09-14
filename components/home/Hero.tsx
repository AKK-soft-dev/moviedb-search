"use client";
import {
  Box,
  Container,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import GradientBackground from "../utils/GradientBackground";
import useLoadingIndicatorToggler from "@/utils/custom-hooks/useLoadingIndicatorToggler";
import useSearchFilter from "@/utils/custom-hooks/useSearchFilter";

export default function Hero({
  backgroundImageUrl,
}: {
  backgroundImageUrl: string;
}) {
  const theme = useTheme();
  const { openLoadingIndicator } = useLoadingIndicatorToggler();
  const { searchResultPage, searchFor } = useSearchFilter();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openLoadingIndicator();
    const searchResultPageUrlForV1 = `/search?query=${query}`;
    const searchResultPageUrlForV2 = `/search/v2${
      searchFor === "all" ? "" : `/${searchFor}`
    }?query=${query}`;
    router.push(
      searchResultPage === "v2"
        ? searchResultPageUrlForV2
        : searchResultPageUrlForV1
    );
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
