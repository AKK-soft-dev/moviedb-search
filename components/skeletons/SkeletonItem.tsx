import { Box, Skeleton } from "@mui/material";
import BSGridItem from "../utils/items/BSGridItem";

export default function MovieSkeletonItem() {
  return (
    <BSGridItem>
      <Box
        mb={4}
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
          sx={{ height: { xs: 170, sm: 200, md: 220, lg: 240, xl: 250 } }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width="100%"
          sx={{ fontSize: "1.5rem" }}
        />
      </Box>
    </BSGridItem>
  );
}
