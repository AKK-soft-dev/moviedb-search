"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";

export default function Recommendations({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      component="section"
      sx={{ backgroundColor: "background.paper", py: 5 }}
    >
      <Container>
        <Box
          display="flex"
          mb={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h5"
            fontWeight={500}
            display="inline-block"
            sx={{
              borderBottom: "3px solid",
              borderBottomColor: "secondary.main",
            }}
          >
            Recommended
          </Typography>
          <Box>
            <Button
              startIcon={<ArrowBackIcon />}
              className="recommendations-prev"
            >
              Prev
            </Button>
            <Button
              endIcon={<ArrowForwardIcon />}
              className="recommendations-next"
            >
              Next
            </Button>
          </Box>
        </Box>
        {children}
      </Container>
    </Box>
  );
}
