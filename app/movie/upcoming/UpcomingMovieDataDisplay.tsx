"use client";
import MovieItem from "@/components/utils/MovieItem";
import withPageDataDisplay from "@/components/utils/withPageDataDisplay";

const UpcomingMovieDataDisplay = withPageDataDisplay({
  pageType: { type: "movie", category: "upcoming" },
  ItemDisplayComponent: MovieItem,
});

export default UpcomingMovieDataDisplay;
