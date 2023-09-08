import { useState } from "react";
import { Box, Pagination } from "@mui/material";
import BSGridContainer from "@/components/utils/BSGridContainer";
import BSGridItem from "@/components/utils/items/BSGridItem";
import { PanelProps } from "./watchlist-types";

export type PanelType = "movie" | "tv";
type Props = {
  type: PanelType;
  ItemDisplayComponent: React.ElementType;
};

export default function withPanel({ type, ItemDisplayComponent }: Props) {
  function Panel(props: PanelProps) {
    const { data, title } = props;
    const { panelData, panelType } = data;
    const [page, setPage] = useState(1);

    const handlePageChange = (
      _event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      setPage(value);
      if (panelType === "movie") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    };

    const totalItemsPerPage = 10;
    const totalItems = (panelData && panelData.length) || 0;
    const totalPages = Math.ceil(totalItems / totalItemsPerPage);

    const startIndex = (page - 1) * totalItemsPerPage;
    const endIndex = page * totalItemsPerPage;

    return (
      <Box>
        {title}
        <BSGridContainer>
          {panelData?.slice(startIndex, endIndex).map((data, i) => {
            const mediaId =
              panelType === "movie"
                ? panelData[i].movie_id
                : panelData[i].tvshow_id;
            return (
              <BSGridItem key={mediaId}>
                <ItemDisplayComponent data={{ id: mediaId, ...data }} />
              </BSGridItem>
            );
          })}
        </BSGridContainer>

        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" my={2}>
            <Pagination
              page={page}
              onChange={handlePageChange}
              count={totalPages > 500 ? 500 : totalPages}
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
