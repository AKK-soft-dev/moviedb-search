import { useCallback, useState } from "react";
import { TabPanelProps } from "./tabs";
import usePaginatedSearchQuery from "@/utils/usePaginatedSearchQuery";
import { Box, Pagination } from "@mui/material";
import BSGridContainer from "@/components/utils/BSGridContainer";
import BSGridItem from "@/components/utils/BSGridItem";

type PanelType = "movie" | "person" | "tv";
type PanelProps = {
  type: PanelType;
  ItemDisplayComponent: React.ElementType;
};

export default function withPanel(props: PanelProps) {
  const { type, ItemDisplayComponent } = props;

  function Panel(props: TabPanelProps) {
    const { data, value, index, ...other } = props;
    const { results, total_pages } = data;
    const [page, setPage] = useState(1);

    const handlePageChange = (
      _event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      setPage(value);
    };

    const resetPage = useCallback(() => {
      setPage(1);
    }, []);

    const dataResults = usePaginatedSearchQuery(
      page,
      type,
      results,
      resetPage
    ) as any[];

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        aria-hidden={value !== index}
        id={`${type}-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box>
          <BSGridContainer>
            {dataResults?.map((dataResult) => (
              <BSGridItem key={dataResult.id}>
                <ItemDisplayComponent data={dataResult} />
              </BSGridItem>
            ))}
          </BSGridContainer>
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

  return Panel;
}
