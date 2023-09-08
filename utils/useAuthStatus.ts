import { useCallback } from "react";
import { useDataQuery, useDataQueryMagic } from "react-data-query";

const authStatusKey = "authenticating_status";
export default function useAuthStatus() {
  const { setQueryData } = useDataQueryMagic();
  const { data } = useDataQuery<{ authenticating: boolean }>(
    authStatusKey,
    undefined,
    {
      initialData: { authenticating: true },
      autoFetchEnabled: false,
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const setAuthenticated = useCallback(() => {
    setQueryData(authStatusKey, () => ({ authenticating: false }));
  }, [setQueryData]);

  return { authenticating: data?.authenticating, setAuthenticated };
}
