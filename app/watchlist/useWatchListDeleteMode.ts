import useWatchList from "@/utils/useWatchList";
import { useDataQuery, useDataQueryMagic } from "react-data-query";

type ReturnType = {
  deleteMode: boolean;
};

const key = "watch_list_delete_helper";
export default function useWatchListItemDeleteMode() {
  const { setQueryData } = useDataQueryMagic();
  const { data } = useDataQuery<ReturnType>(key, undefined, {
    initialData: { deleteMode: false },
    autoFetchEnabled: false,
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const toggleDeleteMode = () => {
    setQueryData(
      key,
      (prev: ReturnType): ReturnType => ({
        ...prev,
        deleteMode: !prev.deleteMode,
      })
    );
  };

  return { deleteMode: data?.deleteMode, toggleDeleteMode };
}
