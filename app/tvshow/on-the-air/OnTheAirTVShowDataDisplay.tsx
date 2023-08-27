"use client";
import TVShowItem from "@/components/utils/TVShowItem";
import withPageDataDisplay from "@/components/utils/withPageDataDisplay";

const OnTheAirTVShowDataDisplay = withPageDataDisplay({
  pageType: { type: "tvshow", category: "on-the-air" },
  ItemDisplayComponent: TVShowItem,
});

export default OnTheAirTVShowDataDisplay;
