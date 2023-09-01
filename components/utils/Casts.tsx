"use client";
import {
  Box,
  Container,
  Button,
  Typography,
  alpha,
  Link as MuiLink,
} from "@mui/material";
import MySlider2 from "./MySlider2";
import SliderItem from "./items/SliderItem";
import CastItem from "./items/CastItem";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";

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

export default function Casts({
  casts: castsData,
  id,
  type,
}: {
  casts: CastsType;
  id: string;
  type: "movie" | "tv";
}) {
  const casts = castsData?.slice(0, 14);
  const castLink = `${id}/cast`;
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
        <Box>
          <Button startIcon={<ArrowBackIcon />} className="casts-prev">
            Prev
          </Button>
          <Button endIcon={<ArrowForwardIcon />} className="casts-next">
            Next
          </Button>
        </Box>
      </Box>

      {casts?.length ? (
        <MySlider2 prevElSelector=".casts-prev" nextElSelector=".casts-next">
          {casts?.map((cast) => (
            <SliderItem key={cast.id}>
              <CastItem data={cast} />
            </SliderItem>
          ))}
          <SliderItem>
            <Box
              sx={{
                height: { xs: 170, sm: 200, md: 220, lg: 240, xl: 250 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: 1,
                borderColor: (theme) => alpha(theme.palette.text.primary, 0.3),
              }}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  LinkComponent={Link}
                  href={castLink}
                  endIcon={<ArrowForwardIcon />}
                  color="inherit"
                >
                  View More
                </Button>
              </Box>
            </Box>
          </SliderItem>
        </MySlider2>
      ) : (
        <Typography>There is no casts to show!</Typography>
      )}

      <Box mt={2}>
        <MuiLink
          color="secondary"
          component={Link}
          href={castLink}
          variant="body2"
          sx={{ typography: "body2" }}
        >
          Full Cast & Crew
        </MuiLink>
      </Box>
    </Container>
  );
}
