"use client";
import MovieItem from "@/components/utils/MovieItem";
import withPageDataDisplay from "@/components/utils/withPageDataDisplay";

const TopRatedMovieDataDisplay = withPageDataDisplay({
  pageType: { type: "movie", category: "top-rated" },
  ItemDisplayComponent: MovieItem,
});

export default TopRatedMovieDataDisplay;
