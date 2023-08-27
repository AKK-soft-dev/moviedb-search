import { useDataQueryMagic } from "react-data-query";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { searchIndicatorKey } from "@/components/Navbar";
import { useSnackbar } from "notistack";
import { PageHocProps } from "@/components/utils/withPageDataDisplay";

export default function usePaginatedPageData({
  page,
  pageType,
  helperData,
  resetPage,
}: {
  page: number;
  pageType: PageHocProps["pageType"];
  helperData: any;
  resetPage: () => void;
}) {
  const [data, setData] = useState(helperData);
  const { enqueueSnackbar } = useSnackbar();
  const prevPage = useRef(page);

  const { setQueryData, getQueryData } = useDataQueryMagic();
  const { type, category } = pageType;

  useEffect(() => {
    const cacheKey = [type, category, page];
    setQueryData(cacheKey, () => helperData);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const cacheKey = [type, category, page];
    if (prevPage.current !== page) {
      prevPage.current = page;

      const dataCache = getQueryData(cacheKey);
      // Prevent fetching from server if the data is already in cache
      if (dataCache) {
        setData(dataCache);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return;
      }
      setQueryData(searchIndicatorKey, () => true);
      fetch(`/api/pages/${type}/${category}?&p=${page}`, {
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
  }, [type, category, page, resetPage, setQueryData, getQueryData]);

  return data;
}
