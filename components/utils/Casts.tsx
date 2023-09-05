"use client";
import { Box, Container, Button, Typography, IconButton } from "@mui/material";
import MySlider2 from "./MySlider2";
import SliderItem from "./items/SliderItem";
import CastItem from "./items/CastItem";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";

export type CastType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string | null;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type CastsType = Array<CastType>;

export default function Casts({ casts, id }: { casts: CastsType; id: string }) {
  return (
    <Container component="section" sx={{ my: 5 }}>
      <Box
        display="flex"
        mb={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h5"
          fontWeight={500}
          display="inline-block"
          sx={{
            borderBottom: "3px solid",
            borderBottomColor: "secondary.main",
          }}
        >
          Casts
        </Typography>
        <Box display="flex" columnGap={1}>
          <IconButton className="casts-prev" color="primary">
            <ArrowBackIcon />
          </IconButton>
          <IconButton className="casts-next" color="primary">
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>

      {casts?.length ? (
        <MySlider2 prevElSelector=".casts-prev" nextElSelector=".casts-next">
          {casts?.map((cast) => (
            <SliderItem key={cast.id}>
              <CastItem data={cast} />
            </SliderItem>
          ))}
        </MySlider2>
      ) : (
        <Typography>There is no casts to show!</Typography>
      )}
    </Container>
  );
}
