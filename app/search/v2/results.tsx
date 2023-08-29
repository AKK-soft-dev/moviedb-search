"use client";
import { Box } from "@mui/material";
import { useEffect } from "react";
import MovieItem from "@/components/utils/MovieItem";
import TVShowItem from "@/components/utils/TVShowItem";
import PersonItem from "@/components/utils/PersonItem";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";
import SearchInfo from "./search-info";
import withResultSection from "./withResultSection";

type DataType = {
  results: any[];
  total_results: number;
  total_pages: number;
};
export interface ResultSectionProps {
  data: DataType;
}

const PeopleResult = withResultSection({
  type: "person",
  ItemDisplayComponent: PersonItem,
});
const MoviesResult = withResultSection({
  type: "movie",
  ItemDisplayComponent: MovieItem,
});
const TVShowsResult = withResultSection({
  type: "tv",
  ItemDisplayComponent: TVShowItem,
});

export default function SearchResults({
  movies,
  shows,
  people,
}: {
  movies: DataType;
  shows: DataType;
  people: DataType;
}) {
  const { closeLoadingIndicator } = useLoadingIndicatorToggler();

  // Close loading indicator on first /search page load and on query changes
  useEffect(() => {
    closeLoadingIndicator();
  });

  const moviesFound = movies.results && movies.results.length > 0;
  const tvShowsFound = shows.results && shows.results.length > 0;
  const peopleFound = people.results && people.results.length > 0;

  const totalMovies = movies.total_results;
  const totalTvShows = shows.total_results;
  const totalPeople = people.total_results;

  return (
    <Box>
      {moviesFound && (
        <Box sx={{ mt: 2, mb: 5 }}>
          <SearchInfo
            prefix={`Movies (${totalMovies > 99 ? "99+" : totalMovies}) :`}
          />
          <MoviesResult data={movies} />
        </Box>
      )}

      {tvShowsFound && (
        <Box sx={{ mt: 2, mb: 5 }}>
          <SearchInfo
            prefix={`TV Shows (${totalTvShows > 99 ? "99+" : totalTvShows}) :`}
          />
          <TVShowsResult data={shows} />
        </Box>
      )}

      {peopleFound && (
        <Box sx={{ mt: 2, mb: 5 }}>
          <SearchInfo
            prefix={`People (${totalPeople > 99 ? "99+" : totalPeople}) :`}
          />
          <PeopleResult data={people} />
        </Box>
      )}
    </Box>
  );
}
