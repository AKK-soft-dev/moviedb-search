import { useState } from "react";
import { ResultSectionProps } from "./results";
import { Box, Button, Pagination } from "@mui/material";
import BSGridContainer from "@/components/utils/BSGridContainer";
import BSGridItem from "@/components/utils/items/BSGridItem";
import { useRouter, useSearchParams } from "next/navigation";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";

export type SectionType = "movie" | "person" | "tv";
type SectionProps = {
  type: SectionType;
  ItemDisplayComponent: React.ElementType;
};

export default function withResultSection({
  type,
  ItemDisplayComponent,
}: SectionProps) {
  function Panel(props: ResultSectionProps) {
    const { data } = props;
    const { results, total_pages } = data;
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const router = useRouter();
    const { openLoadingIndicator } = useLoadingIndicatorToggler();

    const [page] = useState(1);

    const handlePageChange = (
      _event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      router.push(`/search/v2/${type}?query=${query}&page=${value}`);
      openLoadingIndicator();
    };

    return (
      <Box>
        <BSGridContainer>
          {results?.map((dataResult) => (
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
    );
  }
  Panel.displayName = `${type[0].toUpperCase()}${type.slice(1)}Panel`;
  return Panel;
}
