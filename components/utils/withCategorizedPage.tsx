"use client";
import { useState } from "react";
import { Box, Pagination, Container, Typography } from "@mui/material";
import BSGridContainer from "@/components/utils/BSGridContainer";
import BSGridItem from "@/components/utils/BSGridItem";
import { useRouter, useSearchParams } from "next/navigation";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";
import NotFoundData from "./NotFoundData";

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
  title: string;
  pageType: MoviePageType | TvPageType | PersonPageType;
  ItemDisplayComponent: React.ElementType;
};

export default function withCategorizedPage({
  title,
  pageType,
  ItemDisplayComponent,
}: PageHocProps) {
  function CategorizedPage({ data }: PageDataDisplayProps) {
    const { results, total_pages } = data;
    const searchParams = useSearchParams();
    const pageInSearchParams = parseInt(searchParams.get("page") || "1");
    const [page, setPage] = useState(pageInSearchParams);
    const router = useRouter();
    const { type, category } = pageType;
    const { openLoadingIndicator } = useLoadingIndicatorToggler();

    const handlePageChange = (
      _event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      openLoadingIndicator();
      setPage(value);
      router.push(
        `/${
          category === "popular" ? type : `${type}/${category}`
        }?page=${value}`
      );
    };

    const dataNotFound = !results || results.length < 1;

    return (
      <Container>
        <Box mt={2} mb={4} textAlign="center">
          <Typography
            variant="h5"
            component="h1"
            display="inline"
            sx={{
              backgroundImage: `linear-gradient(transparent 83%, rgb(55, 125, 255) 10%)`,
            }}
          >
            {title}
          </Typography>
        </Box>
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
        </Box>
      </Container>
    );
  }
  CategorizedPage.displayName = `${pageType.category[0].toUpperCase()}${pageType.category.slice(
    1
  )}Page`;
  return CategorizedPage;
}
