"use client";
import FetchedDetector from "@/components/utils/FetchedDetector";
import { Container, Box, Typography, Button } from "@mui/material";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container>
      <Box my={10} display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" justifyContent="center">
          <Box
            component="img"
            src="/error.gif"
            width="30%"
            alt="Icon by lordicon.com"
          />
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
