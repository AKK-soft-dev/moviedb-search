"use client";
import { Box } from "@mui/material";
import SkeletonItem from "./SkeletonItem";
import BSGridContainer from "../utils/BSGridContainer";

export default function SearchingIndicatorSkeleton({ length = 12 }) {
  return (
    <Box my={3}>
      <BSGridContainer>
        {Array(length)
          .fill(undefined)
          .map((_, i) => (
            <SkeletonItem key={i} />
          ))}
      </BSGridContainer>
    </Box>
  );
}
