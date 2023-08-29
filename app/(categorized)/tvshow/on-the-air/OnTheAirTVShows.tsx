"use client";
import TVShowItem from "@/components/utils/TVShowItem";
import withCategorizedPage from "@/components/utils/withCategorizedPage";

const OnTheAirTVShows = withCategorizedPage({
  title: "Currently Airing TV Shows",
  pageType: { type: "tvshow", category: "on-the-air" },
  ItemDisplayComponent: TVShowItem,
});

export default OnTheAirTVShows;
