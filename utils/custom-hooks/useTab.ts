import { useDataQuery } from "react-data-query";
import useTabUtils, { tabKey, tabs } from "./useTabUtils";

export default function useTab(initialTab: number | string) {
  const { updateTab, getTabAsNumber } = useTabUtils();
  const { data: activeTab } = useDataQuery<number>(tabKey, undefined, {
    autoFetchEnabled: false,
    cacheTime: Infinity,
    initialData:
      typeof initialTab === "number" ? initialTab : getTabAsNumber(initialTab),
  });

  return { tabs, activeTab, updateTab };
}
