"use client";
import MovieItem from "@/components/utils/MovieItem";
import withCategorizedPage from "@/components/utils/withCategorizedPage";

const TopRatedMovies = withCategorizedPage({
  title: "Top Rated Movies",
  pageType: { type: "movie", category: "top-rated" },
  ItemDisplayComponent: MovieItem,
});

export default TopRatedMovies;
