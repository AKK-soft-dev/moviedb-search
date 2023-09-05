"use client";
import { Box, IconButton, Container, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";

export default function Recommendations({
  bgDefault,
  children,
}: {
  bgDefault?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: bgDefault ? "background.default" : "background.paper",
        py: 5,
      }}
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
          <Box display="flex" columnGap={1}>
            <IconButton color="primary" className="recommendations-prev">
              <ArrowBackIcon />
            </IconButton>
            <IconButton color="primary" className="recommendations-next">
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
        {children}
      </Container>
    </Box>
  );
}
