import { useDataQueryMagic } from "react-data-query";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { searchIndicatorKey } from "@/components/Navbar";
import { useSnackbar } from "notistack";

export default function usePaginatedSearchQuery(
  page: number,
  searchType: "movie" | "tv" | "person",
  helperData: any,
  resetPage: () => void
) {
  const [data, setData] = useState(helperData);
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

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
    // If the previous query and current query are different, set the page to 1 and set new movies coming from server
    if (prevQuery.current !== currentQuery) {
      prevQuery.current = currentQuery;
      prevPage.current = 1;
      resetPage();
      setData(helperData);
      setQueryData(cacheKey, helperData);
    } else if (
      prevPage.current !== page &&
      prevQuery.current === currentQuery
    ) {
      prevPage.current = page;

      const dataCache = getQueryData(cacheKey);
      // Prevent fetching from server if the data is already in cache
      if (dataCache) {
        setData(dataCache);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return;
      }
      setQueryData(searchIndicatorKey, () => true);
      fetch(`/api/search/${searchType}?query=${currentQuery}&p=${page}`, {
        signal: abortController.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.results);
          setQueryData(cacheKey, data.results);
          setQueryData(searchIndicatorKey, () => false);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        })
        .catch((e: Error) => {
          if (e.name !== "AbortError") {
            enqueueSnackbar(e.message, {
              variant: "error",
              anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
            setQueryData(searchIndicatorKey, () => false);
          }
        });
    }

    return () => {
      abortController.abort();
    };
  }, [currentQuery, searchType, page, resetPage, setQueryData, getQueryData]);

  return data;
}
