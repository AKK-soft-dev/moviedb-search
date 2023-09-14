import { searchIndicatorKey } from "@/components/Navbar";
import { useCallback } from "react";
import { useDataQueryMagic } from "react-data-query";

export default function useLoadingIndicatorToggler() {
  const { setQueryData } = useDataQueryMagic();
  const closeLoadingIndicator = useCallback(() => {
    setQueryData(searchIndicatorKey, () => false);
  }, [setQueryData]);
  const openLoadingIndicator = useCallback(() => {
    setQueryData(searchIndicatorKey, () => true);
  }, [setQueryData]);
  const toggleLoadingIndicator = useCallback(() => {
    setQueryData(searchIndicatorKey, (prev) => !prev);
  }, [setQueryData]);

  return {
    openLoadingIndicator,
    closeLoadingIndicator,
    toggleLoadingIndicator,
  };
}
