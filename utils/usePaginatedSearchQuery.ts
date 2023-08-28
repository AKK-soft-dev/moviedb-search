import { useDataQueryMagic } from "react-data-query";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { searchIndicatorKey } from "@/components/Navbar";
import { useSnackbar } from "notistack";
import useLoadingIndicatorToggler from "./useLoadingIndicatorToggler";

export default function usePaginatedSearchQuery(
  page: number,
  searchType: "movie" | "tv" | "person",
  helperData: any,
  resetPage: (page: number) => void
): { data: any[]; paginatedCurrentPage: number } {
  const [data, setData] = useState(helperData);
  const [paginatedCurrentPage, setPaginatedCurrentPage] = useState(page);
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const { openLoadingIndicator, closeLoadingIndicator } =
    useLoadingIndicatorToggler();

  const currentQuery = searchParams.get("query");
  const prevQuery = useRef(currentQuery);
  const prevPage = useRef(page);

  const { setQueryData, getQueryData } = useDataQueryMagic();

  useEffect(() => {
    const cacheKey = [searchType, currentQuery, page];
    setQueryData(cacheKey, () => helperData);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const cacheKey = [searchType, currentQuery, page];

    const cacheData = (data: any) => {
      setQueryData(cacheKey, data);
    };
    // If the previous query and current query are different, set the page to 1 and set new movies coming from server
    if (prevQuery.current !== currentQuery) {
      prevQuery.current = currentQuery;
      prevPage.current = 1;
      // reset the page on query changes
      resetPage(1);
      setPaginatedCurrentPage(1);
      setData(helperData);
      cacheData(helperData);
    } else if (
      prevPage.current !== page &&
      prevQuery.current === currentQuery
    ) {
      const dataCache = getQueryData(cacheKey);
      // Prevent fetching from server if the data is already in cache
      if (dataCache) {
        prevPage.current = page;
        setData(dataCache);
        setPaginatedCurrentPage(page);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return;
      }
      openLoadingIndicator();
      fetch(`/api/search/${searchType}?query=${currentQuery}&p=${page}`, {
        signal: abortController.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.results);
          cacheData(data.results);
          closeLoadingIndicator();
          setPaginatedCurrentPage(page);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          prevPage.current = page;
        })
        .catch((e: Error) => {
          if (e.name !== "AbortError") {
            enqueueSnackbar(e.message, {
              variant: "error",
              anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
            // reset to previous page if fetch failed
            resetPage(prevPage.current);
            setQueryData(searchIndicatorKey, () => false);
          }
        });
    }

    return () => {
      abortController.abort();
    };
  }, [
    currentQuery,
    searchType,
    page,
    resetPage,
    setQueryData,
    getQueryData,
    openLoadingIndicator,
    closeLoadingIndicator,
  ]);

  return { data, paginatedCurrentPage };
}
