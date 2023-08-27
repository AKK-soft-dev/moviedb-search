"use client";
import TVShowItem from "@/components/utils/TVShowItem";
import withPageDataDisplay from "@/components/utils/withPageDataDisplay";

const AiringTodayTVShowDataDisplay = withPageDataDisplay({
  pageType: { type: "tvshow", category: "airing-today" },
  ItemDisplayComponent: TVShowItem,
});

export default AiringTodayTVShowDataDisplay;
