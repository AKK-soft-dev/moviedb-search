"use client";
import BSGridContainer from "@/components/utils/BSGridContainer";
import { CombinedCreditsType } from "./combined-credits-types";
import { Container, Typography, Box } from "@mui/material";
import CombinedCreditMovieItem from "./CombinedCreditMovieItem";
import CombinedCreditTVShowItem from "./CombinedCreditTVShowItem";
import GridItem from "@/components/utils/items/BSGridItem";
import { MovieItemDataType } from "@/components/utils/items/MovieItem";
import { TVShowItemDataType } from "@/components/utils/items/TVShowItem";

export default function CombinedCredits({
  data,
}: {
  data: CombinedCreditsType;
}) {
  const { cast } = data;

  return (
    <Container>
      <Typography
        variant="h5"
        fontWeight={500}
        display="inline-block"
        sx={{
          borderBottom: "3px solid",
          borderBottomColor: "secondary.main",
        }}
      >
        Acting
      </Typography>
      <Box my={3}>
        <BSGridContainer>
          {cast?.map((ca) => {
            return (
              <GridItem key={ca.id}>
                {ca.media_type === "movie" ? (
                  <CombinedCreditMovieItem data={ca} />
                ) : (
                  <CombinedCreditTVShowItem data={ca} />
                )}
              </GridItem>
            );
          })}
        </BSGridContainer>
      </Box>
    </Container>
  );
}
