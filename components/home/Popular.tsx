"use client";
import {
  Box,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import SingleRowSkeleton from "../skeletons/SingleRowSkeleton";

export default function Popular() {
  const [releaseType, setReleaseType] = useState("digital");
  const theme = useTheme();
  const handleChange = (
    _e: React.MouseEvent<HTMLElement>,
    newReleaseType: string
  ) => {
    if (newReleaseType !== null) {
      setReleaseType(newReleaseType);
    }
  };

  return (
    <Container component="section" sx={{ my: 3.5 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          component="h3"
          variant="h5"
          className="text-gradient-util"
          sx={{
            mr: 2,
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.secondary.light}, #ff4345)`,
          }}
        >
          Popular
        </Typography>
        <ToggleButtonGroup
          size="large"
          color="info"
          value={releaseType}
          exclusive
          onChange={handleChange}
          sx={{ ml: { xs: "auto", sm: 0 } }}
        >
          <ToggleButton value="digital" sx={{ textTransform: "none" }}>
            Digital Released
          </ToggleButton>
          <ToggleButton value="theatre" sx={{ textTransform: "none" }}>
            In Theatres
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <SingleRowSkeleton length={12} />
    </Container>
  );
}
