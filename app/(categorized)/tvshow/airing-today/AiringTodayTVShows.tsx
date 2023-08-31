"use client";
import TVShowItem from "@/components/utils/items/TVShowItem";
import withCategorizedPage from "@/components/utils/withCategorizedPage";

const AiringTodayTVShows = withCategorizedPage({
  title: "TV Shows Airing Today",
  pageType: { type: "tvshow", category: "airing-today" },
  ItemDisplayComponent: TVShowItem,
});

export default AiringTodayTVShows;
