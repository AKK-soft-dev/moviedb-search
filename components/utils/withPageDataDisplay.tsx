"use client";
import { useState } from "react";
import { Box, Pagination } from "@mui/material";
import BSGridContainer from "@/components/utils/BSGridContainer";
import BSGridItem from "@/components/utils/BSGridItem";
import { useRouter, useSearchParams } from "next/navigation";
import { useDataQueryMagic } from "react-data-query";
import { searchIndicatorKey } from "../Navbar";

type DataType = {
  results: any[];
  total_results: number;
  total_pages: number;
};

interface PageDataDisplayProps {
  data: DataType;
}

type MoviePageType = {
  type: "movie";
  category: "popular" | "top-rated" | "now-playing" | "upcoming";
};

type TvPageType = {
  type: "tvshow";
  category: "popular" | "top-rated" | "airing-today" | "on-the-air";
};

type PersonPageType = {
  type: "person";
  category: "popular";
};

export type PageHocProps = {
  pageType: MoviePageType | TvPageType | PersonPageType;
  ItemDisplayComponent: React.ElementType;
};

export default function withPageDataDisplay({
  pageType,
  ItemDisplayComponent,
}: PageHocProps) {
  function Panel({ data }: PageDataDisplayProps) {
    const { results, total_pages } = data;
    const searchParams = useSearchParams();
    const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
    const router = useRouter();
    const { type, category } = pageType;
    const { setQueryData } = useDataQueryMagic();

    const handlePageChange = (
      _event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      setQueryData(searchIndicatorKey, () => true);
      setPage(value);
      router.push(
        `/${
          category === "popular" ? type : `${type}/${category}`
        }?page=${value}`
      );
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
  Panel.displayName = `${pageType.category[0].toUpperCase()}${pageType.category.slice(
    1
  )}Panel`;
  return Panel;
}
