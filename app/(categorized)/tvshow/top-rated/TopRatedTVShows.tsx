"use client";
import TVShowItem from "@/components/utils/TVShowItem";
import withCategorizedPage from "@/components/utils/withCategorizedPage";

const TopRatedTVShows = withCategorizedPage({
  title: "Top Rated TV Shows",
  pageType: { type: "tvshow", category: "top-rated" },
  ItemDisplayComponent: TVShowItem,
});

export default TopRatedTVShows;
