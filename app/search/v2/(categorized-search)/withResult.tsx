import { ResultProps } from "./search-types";
import { Box, Button, Pagination } from "@mui/material";
import BSGridContainer from "@/components/utils/BSGridContainer";
import BSGridItem from "@/components/utils/BSGridItem";
import { useRouter, useSearchParams } from "next/navigation";
import LinkIcon from "@mui/icons-material/Link";
import { useSnackbar } from "notistack";
import NotFoundData from "@/components/utils/NotFoundData";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";

type ResultType = "movie" | "person" | "tv";
type ResultHOCProps = {
  type: ResultType;
  ItemDisplayComponent: React.ElementType;
};

export default function withResult({
  type,
  ItemDisplayComponent,
}: ResultHOCProps) {
  function Panel(props: ResultProps) {
    const { data } = props;
    const { results, total_pages } = data;
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const pageInSearchParams = parseInt(searchParams.get("page") || "1");
    const { enqueueSnackbar } = useSnackbar();
    const { openLoadingIndicator } = useLoadingIndicatorToggler();

    const router = useRouter();

    const handlePageChange = (
      _event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      openLoadingIndicator();
      router.push(`/search/v2/${type}?query=${query}&page=${value}`);
    };

    const copyLink = () => {
      navigator.clipboard
        .writeText(
          `${location.origin}/search/v2/${type}?query=${query}&page=${pageInSearchParams}`
        )
        .then(() => {
          enqueueSnackbar("Copied", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
    };

    const dataNotFound = !results || results.length < 1;

    return (
      <Box>
        <Box>
          {dataNotFound ? (
            <NotFoundData />
          ) : (
            <BSGridContainer>
              {results?.map((dataResult) => (
                <BSGridItem key={dataResult.id}>
                  <ItemDisplayComponent data={dataResult} />
                </BSGridItem>
              ))}
            </BSGridContainer>
          )}

          {total_pages > 1 && (
            <Box display="flex" justifyContent="center" my={2}>
              <Pagination
                page={pageInSearchParams}
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
      </Box>
    );
  }
  Panel.displayName = `${type[0].toUpperCase()}${type.slice(1)}Panel`;
  return Panel;
}
