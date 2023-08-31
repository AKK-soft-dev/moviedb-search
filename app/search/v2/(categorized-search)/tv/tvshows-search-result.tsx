"use client";
import { Box } from "@mui/material";
import { useEffect } from "react";
import withResult from "../withResult";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";
import SearchInfo from "../../search-info";
import { DataType } from "../search-types";
import TVShowItem from "@/components/utils/items/TVShowItem";

const TVShowsResult = withResult({
  type: "tv",
  ItemDisplayComponent: TVShowItem,
});

export default function TVShowsSearchResult({
  tvShows,
}: {
  tvShows: DataType;
}) {
  const { closeLoadingIndicator } = useLoadingIndicatorToggler();

  // Close loading indicator on first /search page load and on query changes
  useEffect(() => {
    closeLoadingIndicator();
  });

  const totalTVShows = tvShows.total_results;

  return (
    <Box>
      <Box sx={{ mt: 2, mb: 5 }}>
        <SearchInfo
          prefix={`TV Shows (${totalTVShows > 99 ? "99+" : totalTVShows}) :`}
        />
        <TVShowsResult data={tvShows} />
      </Box>
    </Box>
  );
}
