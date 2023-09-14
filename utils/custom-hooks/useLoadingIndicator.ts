import { useDataQuery } from "react-data-query";

export const searchIndicatorKey = "search-indicator";
export default function useLoadingIndicator() {
  const { data: isLoading } = useDataQuery(searchIndicatorKey, undefined, {
    initialData: false,
    autoFetchEnabled: false,
  });

  return isLoading;
}
