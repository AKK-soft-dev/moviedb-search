"use client";
import FetchedDetector from "@/components/utils/FetchedAndPageLoadedDetector";
import { Container, Box, Typography, Button, Skeleton } from "@mui/material";
import { useState } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Container>
      <Box my={10} display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" justifyContent="center">
          <Box
            width={{ xs: 150, md: 200 }}
            height={{ xs: 150, md: 200 }}
            position="relative"
          >
            <Box
              component="img"
              src="/error.gif"
              alt="Icon by lordicon.com"
              sx={{ objectFit: "cover", width: 1, height: 1 }}
              onLoad={() => setLoaded(true)}
            />
            <Skeleton
              width="100%"
              height="100%"
              animation="wave"
              sx={{
                display: loaded ? "none" : "block",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </Box>
        </Box>
        <Box textAlign="center">
          <Typography variant="h5" component="p">
            {error.message} {error.digest}
          </Typography>
        </Box>
        <Box mt={3}>
          <Button sx={{ mx: "auto" }} onClick={reset} variant="contained">
            Retry
          </Button>
        </Box>
      </Box>
      <FetchedDetector />
    </Container>
  );
}
