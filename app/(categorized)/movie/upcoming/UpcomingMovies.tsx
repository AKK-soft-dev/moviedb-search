"use client";
import MovieItem from "@/components/utils/MovieItem";
import withCategorizedPage from "@/components/utils/withCategorizedPage";

const UpcomingMoviesPage = withCategorizedPage({
  title: "Upcoming Movies",
  pageType: { type: "movie", category: "upcoming" },
  ItemDisplayComponent: MovieItem,
});

export default UpcomingMoviesPage;
