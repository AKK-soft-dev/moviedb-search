import { Box, Pagination } from "@mui/material";
import { TabPanelProps } from "./tabs";
import PeopleResultItem from "./item/people-res-item";
import BSGridItem from "@/components/utils/BSGridItem";
import { useCallback, useState } from "react";
import usePaginatedSearchQuery from "@/utils/usePaginatedSearchQuery";

export default function PeoplePanel(props: TabPanelProps) {
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

  const people = usePaginatedSearchQuery(
    page,
    "person",
    results,
    resetPage
  ) as any[];

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-hidden={value !== index}
      id={`people-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>
        <Box component="div" className="row g-2">
          {people?.map((person) => (
            <BSGridItem key={person.id}>
              <PeopleResultItem person={person} />
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
