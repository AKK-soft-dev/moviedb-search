"use client";
import { Box } from "@mui/material";
import { useEffect } from "react";
import withResult from "../withResult";
import MovieItem from "@/components/utils/items/MovieItem";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";
import SearchInfo from "../../search-info";
import { DataType } from "../search-types";

const MoviesResult = withResult({
  type: "movie",
  ItemDisplayComponent: MovieItem,
});

export default function MoviesSearchResult({ movies }: { movies: DataType }) {
  const { closeLoadingIndicator } = useLoadingIndicatorToggler();

  // Close loading indicator on first /search page load and on query changes
  useEffect(() => {
    closeLoadingIndicator();
  });

  const totalMovies = movies.total_results;

  return (
    <Box>
      <Box sx={{ mt: 2, mb: 5 }}>
        <SearchInfo
          prefix={`Movies (${totalMovies > 99 ? "99+" : totalMovies}) :`}
        />
        <MoviesResult data={movies} />
      </Box>
    </Box>
  );
}
