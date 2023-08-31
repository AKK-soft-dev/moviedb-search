"use client";
import { IconButton, IconButtonProps } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState } from "react";
import CustomTooltip from "./CustomTooltip";

export default function AddToWatchListButton(props: IconButtonProps) {
  const [added, setAdded] = useState(false);
  return (
    <CustomTooltip title={`Add${added ? "ed" : ""} to watch list`}>
      <IconButton
        color="primary"
        {...props}
        onClick={() => setAdded((prev) => !prev)}
      >
        {added ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </CustomTooltip>
  );
}
