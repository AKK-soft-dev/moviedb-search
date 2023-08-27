"use client";
import TVShowItem from "@/components/utils/TVShowItem";
import withPageDataDisplay from "@/components/utils/withPageDataDisplay";

const PopularTVShowDataDisplay = withPageDataDisplay({
  pageType: { type: "tvshow", category: "popular" },
  ItemDisplayComponent: TVShowItem,
});

export default PopularTVShowDataDisplay;
