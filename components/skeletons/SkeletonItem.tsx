import { Box, Skeleton } from "@mui/material";
import SliderItem from "../utils/SliderItem";

export default function MovieSkeletonItem() {
  return (
    <SliderItem>
      <Box
        sx={{
          display: "flex",
          width: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Skeleton
          animation="wave"
          variant="rounded"
          width="100%"
          sx={{ height: { xs: 220, sm: 230, md: 250 } }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width="100%"
          sx={{ fontSize: "1.5rem" }}
        />
      </Box>
    </SliderItem>
  );
}
