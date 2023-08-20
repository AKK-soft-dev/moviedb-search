"use client";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Container,
  styled,
  TypographyProps,
} from "@mui/material";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";

const StyledTypography = styled(Typography)<TypographyProps & { href: string }>(
  ({ theme }) => ({
    position: "relative",
    top: 0,
    left: 0,
    color: theme.palette.text.primary,
    transition: "transform",
    "&:hover": {
      transform: "scale(0.95)",
    },
  })
);

export default function Navbar() {
  return (
    <AppBar position="sticky" elevation={1}>
      <Container>
        <Toolbar component="nav" sx={{ columnGap: 2 }} disableGutters>
          <Link href="/">
            <Image src="/icon.png" alt="App logo" width={32} height={32} />
          </Link>

          <StyledTypography component={Link} variant="body1" href="#">
            Movies
          </StyledTypography>
          <StyledTypography component={Link} variant="body1" href="#">
            TV Shows
          </StyledTypography>
          <StyledTypography component={Link} variant="body1" href="#">
            People
          </StyledTypography>

          <Box sx={{ ml: "auto" }}>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
