import { useDataQueryMagic } from "react-data-query";
import { useCallback } from "react";

export const tabKey = "current-tab";
export const tabs = ["movie", "tv", "person"];

export default function useTabUtils() {
  const { setQueryData } = useDataQueryMagic();

  const getTabAsNumber = useCallback((currentTab: string) => {
    return tabs.findIndex((tab) => tab === currentTab) || 0;
  }, []);

  const updateTab = useCallback((tab: number | string) => {
    setQueryData(tabKey, () =>
      typeof tab === "number" ? tab : getTabAsNumber(tab)
    );
  }, []);

  return { updateTab, getTabAsNumber };
}
