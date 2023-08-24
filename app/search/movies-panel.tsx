"use client";
import { Box, Pagination } from "@mui/material";
import { TabPanelProps } from "./tabs";
import { useCallback, useState } from "react";
import MovieItem from "@/components/utils/MovieItem";
import BSGridItem from "@/components/utils/BSGridItem";
import usePaginatedSearchQuery from "@/utils/usePaginatedSearchQuery";

export default function MoviesPanel(props: TabPanelProps) {
  const { data, value, index, ...other } = props;
  const { results, total_pages } = data;
  const [page, setPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  const movies = usePaginatedSearchQuery(
    page,
    "movie",
    results,
    resetPage
  ) as any[];

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-hidden={value !== index}
      id={`movies-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>
        <Box component="div" className="row g-2">
          {movies?.map((movie) => (
            <BSGridItem key={movie.id}>
              <MovieItem movie={movie} />
            </BSGridItem>
          ))}
        </Box>

        {total_pages > 1 && (
          <Box display="flex" justifyContent="center" my={2}>
            <Pagination
              page={page}
              onChange={handlePageChange}
              count={total_pages > 500 ? 500 : total_pages}
              showLastButton
              showFirstButton
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Box>
        )}
      </Box>
    </div>
  );
}
