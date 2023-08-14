"use client";
import { Box } from "@mui/material";
import SkeletonItem from "./SkeletonItem";
import MySlider2 from "../utils/MySlider2";

export default function SingleRowSkeleton({ length = 6 }) {
  console.log("streaming with length ", length);
  return (
    <Box my={3}>
      <MySlider2>
        {Array(length)
          .fill(undefined)
          .map((_, i) => (
            <SkeletonItem key={i} />
          ))}
      </MySlider2>
    </Box>
  );
}
