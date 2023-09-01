"use client";
import MovieItem from "@/components/utils/items/MovieItem";
import { Box, Typography } from "@mui/material";
import MySlider2 from "@/components/utils/MySlider2";
import SliderItem from "@/components/utils/items/SliderItem";

export default function RecommendationsDataDisplay({
  data: { results },
}: {
  data: { results: any[] };
}) {
  return (
    <Box my={3}>
      {results && results.length > 0 ? (
        <MySlider2
          prevElSelector=".recommendations-prev"
          nextElSelector=".recommendations-next"
        >
          {results?.map((movie) => (
            <SliderItem key={movie.id}>
              <MovieItem data={movie} defaultBg />
            </SliderItem>
          ))}
        </MySlider2>
      ) : (
        <Typography>There is no recommendations!</Typography>
      )}
    </Box>
  );
}
