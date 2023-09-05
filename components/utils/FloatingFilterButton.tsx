"use client";
import { Button } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function FloatingFilterButton() {
  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      variant="contained"
      className="animate__animated animate__heartBeat animate__delay-3s"
      sx={{
        position: "fixed",
        top: "70%",
        right: 0,
        width: 50,
        height: 50,
        zIndex: (theme) => theme.zIndex.fab,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <KeyboardArrowUpIcon />
    </Button>
  );
}
