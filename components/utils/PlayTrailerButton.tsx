"use client";

import { Button, ButtonProps } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function PlayTrailerButton(props: ButtonProps) {
  return (
    <Button
      startIcon={<PlayArrowIcon />}
      color="inherit"
      variant="outlined"
      {...props}
    >
      Play Trailer
    </Button>
  );
}
