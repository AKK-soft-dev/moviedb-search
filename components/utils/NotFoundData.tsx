import { Box, Typography, Container } from "@mui/material";

export default function NotFoundData() {
  return (
    <Container>
      <Box my={10} display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" justifyContent="center">
          <Box
            component="img"
            src="/thumb-down.gif"
            width="30%"
            alt="Icon by lordicon.com"
          />
        </Box>
        <Box textAlign="center">
          <Typography variant="h5" component="p">
            Sorry! We couldn&apos;t find anything!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
