"use client";
import { Button } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

export default function FloatingFilterButton() {
  return (
    <Button
      size="medium"
      variant="contained"
      className="animate__animated animate__heartBeat animate__delay-3s"
      sx={{
        position: "fixed",
        top: "70%",
        right: 0,
        width: 60,
        height: 60,
        p: 1,
        zIndex: (theme) => theme.zIndex.fab,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <TuneIcon fontSize="large" />
    </Button>
  );
}
