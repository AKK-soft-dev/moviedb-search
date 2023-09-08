import { Box, Typography, Container, Skeleton } from "@mui/material";
import { useState } from "react";

export default function NotFoundData({ message }: { message?: string }) {
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
              src="/thumb-down.gif"
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
            {message || <>Sorry! We couldn&apos;t find anything!</>}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
