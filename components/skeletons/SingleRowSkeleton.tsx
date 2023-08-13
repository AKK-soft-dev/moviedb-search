import { Grid, Box } from "@mui/material";
import SkeletonItem from "./SkeletonItem";

export default function SingleRowSkeleton({ length = 6 }) {
  console.log("streaming with length ", length);
  return (
    <Box my={3}>
      <Grid container spacing={{ xs: 1.2, sm: 2.2, md: 2.8, lg: 3.2, xl: 4 }}>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </Grid>
    </Box>
  );
}
