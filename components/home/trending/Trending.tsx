"use client";
import {
  Box,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Button,
} from "@mui/material";
import React, { createContext, useState, Suspense } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import { inter } from "@/fonts/fonts";
import StreamTrending from "./StreamTrending";
import SingleRowSkeleton from "@/components/skeletons/SingleRowSkeleton";

type TrendingContextType = {
  streamed: boolean;
  trendTime: string;
  setStreamed: React.Dispatch<React.SetStateAction<any>>;
};

export const TrendingContext = createContext({} as TrendingContextType);

export default function Trending({ children }: { children: React.ReactNode }) {
  const [streamed, setStreamed] = useState(false);
  const [trendTime, setTrendTime] = useState("day");
  const handleChange = (
    _e: React.MouseEvent<HTMLElement>,
    newTrendTime: string
  ) => {
    if (newTrendTime !== null) {
      setTrendTime(newTrendTime);
    }
  };

  return (
    <Container component="section" sx={{ my: 3.5 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            fontWeight: 700,
            mr: 2,
          }}
          className={`${inter.className} text-blue-gradient`}
          component="h3"
          variant="h5"
        >
          Trending
        </Typography>
        <ToggleButtonGroup
          size="large"
          color="info"
          sx={{ ml: { xs: "auto", sm: 0 } }}
          value={trendTime}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="day" sx={{ textTransform: "none" }}>
            Today
          </ToggleButton>
          <ToggleButton value="week" sx={{ textTransform: "none" }}>
            This Week
          </ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ ml: "auto", display: { xs: "none", sm: "block" } }}>
          <Button startIcon={<ArrowBackIcon />} className="prev">
            Prev
          </Button>
          <Button endIcon={<ArrowForwardIcon />} className="next">
            Next
          </Button>
        </Box>
      </Box>
      <TrendingContext.Provider value={{ trendTime, streamed, setStreamed }}>
        {children}
      </TrendingContext.Provider>
    </Container>
  );
}
