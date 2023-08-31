import { Box, Paper, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Paper
      component="footer"
      elevation={0}
      sx={{ mt: "auto", borderTop: 2, borderTopColor: "background.default" }}
    >
      <Container>
        <Box py={2}>
          <Typography textAlign="center" variant="body2">
            &#169; 2023 Aung Ko Ko. All rights reserved!
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
