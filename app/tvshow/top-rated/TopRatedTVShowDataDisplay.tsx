"use client";
import TVShowItem from "@/components/utils/TVShowItem";
import withPageDataDisplay from "@/components/utils/withPageDataDisplay";

const TopRatedTVShowDataDisplay = withPageDataDisplay({
  pageType: { type: "tvshow", category: "top-rated" },
  ItemDisplayComponent: TVShowItem,
});

export default TopRatedTVShowDataDisplay;
