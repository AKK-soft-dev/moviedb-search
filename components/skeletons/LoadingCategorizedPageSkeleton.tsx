"use client";
import { Box, Container, Skeleton } from "@mui/material";
import SkeletonItem from "./SkeletonItem";
import BSGridContainer from "../utils/BSGridContainer";

export default function LoadingCategorizedPageSkeleton({ length = 20 }) {
  return (
    <Container>
      <Box my={2}>
        <Skeleton
          variant="text"
          animation="wave"
          width={170}
          sx={{ typography: "h3", mx: "auto" }}
        />
      </Box>
      <Box>
        <BSGridContainer>
          {Array(length)
            .fill(undefined)
            .map((_, i) => (
              <SkeletonItem key={i} />
            ))}
        </BSGridContainer>
      </Box>
    </Container>
  );
}
