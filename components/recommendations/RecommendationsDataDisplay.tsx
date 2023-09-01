"use client";
import MovieItem from "@/components/utils/items/MovieItem";
import TVShowItem from "@/components/utils/items/TVShowItem";
import { Box, Typography } from "@mui/material";
import MySlider2 from "@/components/utils/MySlider2";
import SliderItem from "@/components/utils/items/SliderItem";
import { RecommendationsType } from "./StreamRecommendations";

export default function RecommendationsDataDisplay({
  type,
  data: { results },
}: {
  type: RecommendationsType;
  data: { results: any[] };
}) {
  return (
    <Box my={3}>
      {results && results.length > 0 ? (
        <MySlider2
          prevElSelector=".recommendations-prev"
          nextElSelector=".recommendations-next"
        >
          {results?.map((data) => (
            <SliderItem key={data.id}>
              {type === "movie" ? (
                <MovieItem data={data} defaultBg />
              ) : (
                <TVShowItem data={data} defaultBg />
              )}
            </SliderItem>
          ))}
        </MySlider2>
      ) : (
        <Typography>There is no recommendations!</Typography>
      )}
    </Box>
  );
}
