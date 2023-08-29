"use client";
import MovieItem from "@/components/utils/MovieItem";
import withCategorizedPage from "@/components/utils/withCategorizedPage";

const NowPlayingMovies = withCategorizedPage({
  title: "Now Playing Movies",
  pageType: { type: "movie", category: "now-playing" },
  ItemDisplayComponent: MovieItem,
});

export default NowPlayingMovies;
