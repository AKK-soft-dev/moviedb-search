"use client";
import { Badge, IconButton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import useWatchList from "@/utils/useWatchList";
import Link from "next/link";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";
import { usePathname } from "next/navigation";

export default function WatchListLinkButton() {
  const { watchList } = useWatchList();
  const pathname = usePathname();
  const { openLoadingIndicator } = useLoadingIndicatorToggler();
  const totalItemsInWatchList =
    watchList && Object.values(watchList).flat().length;

  const handleClick = () => {
    !pathname.startsWith("/watchlist") && openLoadingIndicator();
  };

  return (
    <IconButton LinkComponent={Link} href="/watchlist" onClick={handleClick}>
      <Badge badgeContent={totalItemsInWatchList || 0} color="primary">
        <BookmarkIcon />
      </Badge>
    </IconButton>
  );
}
