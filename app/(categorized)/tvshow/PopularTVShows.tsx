"use client";
import TVShowItem from "@/components/utils/TVShowItem";
import withCategorizedPage from "@/components/utils/withCategorizedPage";

const PopularTVShows = withCategorizedPage({
  title: "Popular TV Shows",
  pageType: { type: "tvshow", category: "popular" },
  ItemDisplayComponent: TVShowItem,
});

export default PopularTVShows;
