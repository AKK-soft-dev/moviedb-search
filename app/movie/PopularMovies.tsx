"use client";
import MovieItem from "@/components/utils/MovieItem";
import withCategorizedPage from "@/components/utils/withCategorizedPage";

const PopularMoviePage = withCategorizedPage({
  title: "Popular Movies",
  pageType: { type: "movie", category: "popular" },
  ItemDisplayComponent: MovieItem,
});

export default PopularMoviePage;
