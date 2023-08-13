import Hero from "@/components/home/Hero";
import Popular from "@/components/home/Popular";
import { Box, Container, Divider } from "@mui/material";
import Trending from "@/components/home/trending/Trending";
import StreamTrending from "@/components/home/trending/StreamTrending";
import SingleRowSkeleton from "@/components/skeletons/SingleRowSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <Box component="main">
      <Hero />
      <Trending>
        <Suspense fallback={<SingleRowSkeleton />}>
          <StreamTrending />
        </Suspense>
      </Trending>
      <Container>
        <Divider orientation="horizontal" />
      </Container>
      <Popular />
    </Box>
  );
}
