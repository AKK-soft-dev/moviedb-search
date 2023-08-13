import { Box, Grid, Skeleton } from "@mui/material";

export default function MovieSkeletonItem() {
  return (
    <Grid item xs={4} sm={3} md={2} lg={2} xl={1.5}>
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
    </Grid>
  );
}
