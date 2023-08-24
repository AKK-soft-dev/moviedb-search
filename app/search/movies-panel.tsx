"use client";
import { Box, Pagination } from "@mui/material";
import { TabPanelProps } from "./tabs";
import { useEffect, useRef, useState } from "react";
import MovieItem from "@/components/utils/MovieItem";
import BSGridItem from "@/components/utils/BSGridItem";
import { useSearchParams } from "next/navigation";
import { useDataQueryMagic } from "react-data-query";
import { searchIndicatorKey } from "@/components/Navbar";

export default function MoviesPanel(props: TabPanelProps) {
  const searchParams = useSearchParams();
  const { data, value, index, ...other } = props;
  const { results, total_pages } = data;
  const [movies, setMovies] = useState(results);
  const { setQueryData } = useDataQueryMagic();
  const [page, setPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const prevQuery = useRef<string | null>(searchParams.get("query"));
  const prevPage = useRef<number>(page);
  const currentQuery = searchParams.get("query");

  useEffect(() => {
    const abortController = new AbortController();
    // If the previous query and current query are different, set the page to 1 and set new movies coming from server
    if (prevQuery.current !== currentQuery) {
      prevQuery.current = currentQuery;
      prevPage.current = 1;
      setPage(1);
      setMovies(results);
    } else if (
      prevPage.current !== page &&
      prevQuery.current === currentQuery
    ) {
      prevPage.current = page;
      setQueryData(searchIndicatorKey, () => true);
      fetch(`/api/search/movie?query=${currentQuery}&p=${page}`, {
        signal: abortController.signal,
      })
        .then((res) => res.json())
        .then((movies) => {
          setMovies(movies.results);
          setQueryData(searchIndicatorKey, () => false);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });
    }

    return () => {
      abortController.abort();
    };
  }, [currentQuery, page]);

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
          {movies?.map((res) => (
            <BSGridItem key={res.id}>
              <MovieItem movie={res} />
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
