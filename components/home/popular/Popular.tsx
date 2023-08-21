"use client";
import {
  Box,
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { createContext } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";

type PopularContextType = {
  streamed: boolean;
  releaseType: string;
  setStreamed: React.Dispatch<React.SetStateAction<any>>;
};

export const PopularContext = createContext({} as PopularContextType);

export default function Popular({ children }: { children: React.ReactNode }) {
  const [streamed, setStreamed] = useState(false);
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
            background: `linear-gradient(45deg, #ff4345, ${theme.palette.secondary.light})`,
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
          <ToggleButton value="theatrical" sx={{ textTransform: "none" }}>
            In Theatres
          </ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ ml: "auto", display: { xs: "none", sm: "block" } }}>
          <Button startIcon={<ArrowBackIcon />} className="popular-prev">
            Prev
          </Button>
          <Button endIcon={<ArrowForwardIcon />} className="popular-next">
            Next
          </Button>
        </Box>
      </Box>
      <PopularContext.Provider value={{ releaseType, streamed, setStreamed }}>
        {children}
      </PopularContext.Provider>
    </Container>
  );
}
