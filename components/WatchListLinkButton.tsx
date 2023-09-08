"use client";
import { Badge, IconButton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import useWatchList from "@/utils/useWatchList";
import Link from "next/link";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";

export default function WatchListLinkButton() {
  const { watchList } = useWatchList();
  const { openLoadingIndicator } = useLoadingIndicatorToggler();
  const totalItemsInWatchList =
    watchList && Object.values(watchList).flat().length;
  return (
    <IconButton
      LinkComponent={Link}
      href="/watchlist"
      onClick={openLoadingIndicator}
    >
      <Badge badgeContent={totalItemsInWatchList || 0} color="primary">
        <BookmarkIcon />
      </Badge>
    </IconButton>
  );
}
