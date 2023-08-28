"use client";
import { Container, Box, Typography } from "@mui/material";

export default function MovieNotFound() {
  return (
    <Container>
      <Box my={10} display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" justifyContent="center">
          <Box
            component="img"
            src="/target.gif"
            width="30%"
            alt="Icon by lordicon.com"
          />
        </Box>
        <Box textAlign="center" mt={3}>
          <Typography variant="h5" component="p">
            Could not find your requested movie!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
