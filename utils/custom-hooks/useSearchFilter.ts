import { useDataQuery, useDataQueryMagic } from "react-data-query";
import { useEffect } from "react";

type SearchResultPageType = "v1" | "v2";
type SearchForType = "all" | "movie" | "tv" | "person";

type SearchFilterType = {
  searchResultPage: SearchResultPageType;
  searchFor: SearchForType;
};

const defaultOption: SearchFilterType = {
  searchResultPage: "v2",
  searchFor: "all",
};

const key = "app-search-filter";
export default function useSearchFilter() {
  const { data } = useDataQuery<SearchFilterType>(key, undefined, {
    initialData: defaultOption,
    autoFetchEnabled: false,
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  const { setQueryData } = useDataQueryMagic();

  useEffect(() => {
    const option = localStorage.getItem(key);
    const savedOptions = option && JSON.parse(option);

    setQueryData(key, () => savedOptions || defaultOption);
  }, [key, defaultOption]);

  const updateSearchResultPage = (searchResultPage: SearchResultPageType) => {
    setQueryData(key, (prev: SearchFilterType): SearchFilterType => {
      const newOption = { ...prev, searchResultPage };
      // localStorage.setItem(key, JSON.stringify(newOption));
      return newOption;
    });
  };

  const updateSearchFor = (searchFor: SearchForType) => {
    setQueryData(key, (prev: SearchFilterType): SearchFilterType => {
      const newOption = { ...prev, searchFor };
      // localStorage.setItem(key, JSON.stringify(newOption));
      return newOption;
    });
  };

  const restoreDefault = () => {
    setQueryData(key, () => defaultOption);
  };

  const saveOption = () => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  return {
    searchResultPage: data?.searchResultPage,
    searchFor: data?.searchFor,
    updateSearchResultPage,
    updateSearchFor,
    restoreDefault,
    saveOption,
  };
}
