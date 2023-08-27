"use client";
import MovieItem from "@/components/utils/MovieItem";
import withPageDataDisplay from "@/components/utils/withPageDataDisplay";

const NowPlayingMovieDataDisplay = withPageDataDisplay({
  pageType: { type: "movie", category: "now-playing" },
  ItemDisplayComponent: MovieItem,
});

export default NowPlayingMovieDataDisplay;
