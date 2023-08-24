import { Box, Pagination } from "@mui/material";
import { TabPanelProps } from "./tabs";
import BSGridItem from "@/components/utils/BSGridItem";
import TVShowItem from "@/components/utils/TVShowItem";
import { useCallback, useState } from "react";
import usePaginatedSearchQuery from "@/utils/usePaginatedSearchQuery";

export default function TVShowsPanel(props: TabPanelProps) {
  const { data, value, index, ...other } = props;
  const { results, total_pages } = data;
  const [page, setPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  const tvShows = usePaginatedSearchQuery(
    page,
    "tv",
    results,
    resetPage
  ) as any[];

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-hidden={value !== index}
      id={`tv-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>
        <Box component="div" className="row g-2">
          {tvShows?.map((tvShow) => (
            <BSGridItem key={tvShow.id}>
              <TVShowItem tv={tvShow} />
            </BSGridItem>
          ))}
        </Box>
        {total_pages > 1 && (
          <Box display="flex" justifyContent="center" my={2}>
            <Pagination
              page={page}
              onChange={handlePageChange}
              count={total_pages > 500 ? 500 : total_pages}
              showLastButton
              showFirstButton
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Box>
        )}
      </Box>
    </div>
  );
}
