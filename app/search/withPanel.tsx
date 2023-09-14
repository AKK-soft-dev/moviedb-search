import { useCallback, useState } from "react";
import { TabPanelProps } from "./tabs";
import usePaginatedSearchQuery from "@/utils/custom-hooks/usePaginatedSearchQuery";
import { Box, Button, Pagination } from "@mui/material";
import BSGridContainer from "@/components/utils/BSGridContainer";
import BSGridItem from "@/components/utils/items/BSGridItem";
import { useSearchParams } from "next/navigation";
import LinkIcon from "@mui/icons-material/Link";
import { useSnackbar } from "notistack";
import NotFoundData from "@/components/utils/NotFoundData";

export type PanelType = "movie" | "person" | "tv";
type PanelProps = {
  type: PanelType;
  ItemDisplayComponent: React.ElementType;
};

export default function withPanel({ type, ItemDisplayComponent }: PanelProps) {
  function Panel(props: TabPanelProps) {
    const { data, value, index, ...other } = props;
    const { results, total_pages } = data;
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const pageInSearchParams = parseInt(searchParams.get("page") || "1");
    const forInSearchParams = searchParams.get("for");
    const { enqueueSnackbar } = useSnackbar();

    // If the 'for' search parameter doesn't exist, set the page to 1
    const [page, setPage] = useState(
      forInSearchParams === type ? pageInSearchParams : 1
    );

    const handlePageChange = (
      _event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      setPage(value);
    };

    const copyLink = () => {
      navigator.clipboard
        .writeText(
          `${location.origin}/search?query=${query}&for=${type}&page=${page}`
        )
        .then(() => {
          enqueueSnackbar("Copied", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
    };

    const resetPage = useCallback((page: number) => {
      setPage(page);
    }, []);

    const { data: dataResults, paginatedCurrentPage } = usePaginatedSearchQuery(
      page,
      type,
      results,
      resetPage
    );

    const dataNotFound = !dataResults || dataResults.length < 1;

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
          {dataNotFound ? (
            <NotFoundData />
          ) : (
            <BSGridContainer>
              {dataResults?.map((dataResult) => (
                <BSGridItem key={dataResult.id}>
                  <ItemDisplayComponent data={dataResult} />
                </BSGridItem>
              ))}
            </BSGridContainer>
          )}

          {total_pages > 1 && (
            <Box display="flex" justifyContent="center" my={2}>
              <Pagination
                page={paginatedCurrentPage}
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
          {!dataNotFound && (
            <Box mt={5} mb={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<LinkIcon sx={{ transform: "rotate(-50deg)" }} />}
                onClick={copyLink}
              >
                Copy sharable link
              </Button>
            </Box>
          )}
        </Box>
      </div>
    );
  }
  Panel.displayName = `${type[0].toUpperCase()}${type.slice(1)}Panel`;
  return Panel;
}
