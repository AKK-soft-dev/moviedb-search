"use client";
import { Box } from "@mui/material";
import SkeletonItem from "./SkeletonItem";
import MySlider from "../utils/MySlider";

export default function SingleRowSkeleton({ length = 6 }) {
  console.log("streaming with length ", length);
  return (
    <Box my={3}>
      <MySlider>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </MySlider>
    </Box>
  );
}
