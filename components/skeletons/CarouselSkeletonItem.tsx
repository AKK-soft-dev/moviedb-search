import { styled, Box, Skeleton } from "@mui/material";

export const Slide = styled((props: { children: React.ReactNode }) => (
  <Box sx={{ px: { xs: 1.4, md: 2, lg: 3 }, mt: 1 }} {...props} />
))(({ theme }) => ({
  transition: theme.transitions.create("all"),
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

export default function CarouselSkeletonItem() {
  return (
    <Box sx={{ mb: 4 }}>
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
          sx={{ height: { xs: 230, md: 250 } }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width="100%"
          sx={{ fontSize: "1.5rem" }}
        />
      </Box>
    </Box>
  );
}
