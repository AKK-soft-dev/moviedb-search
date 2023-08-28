import { searchIndicatorKey } from "@/components/Navbar";
import { useCallback } from "react";
import { useDataQueryMagic } from "react-data-query";

export default function useLoadingIndicatorToggler() {
  const { setQueryData } = useDataQueryMagic();
  const closeLoadingIndicator = useCallback(() => {
    setQueryData(searchIndicatorKey, () => false);
  }, []);
  const openLoadingIndicator = useCallback(() => {
    setQueryData(searchIndicatorKey, () => true);
  }, []);
  const toggleLoadingIndicator = useCallback(() => {
    setQueryData(searchIndicatorKey, (prev) => !prev);
  }, []);

  return {
    openLoadingIndicator,
    closeLoadingIndicator,
    toggleLoadingIndicator,
  };
}
