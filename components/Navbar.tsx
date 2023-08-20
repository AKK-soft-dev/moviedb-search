"use client";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Container,
  Drawer,
  styled,
  TypographyProps,
  List,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LiveTVIcon from "@mui/icons-material/LiveTv";
import MovieIcon from "@mui/icons-material/LocalMovies";
import PeopleIcon from "@mui/icons-material/Group";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <AppBar position="sticky" elevation={1}>
      <Container>
        <Toolbar component="nav" sx={{ columnGap: 2 }} disableGutters>
          <IconButton
            onClick={toggleDrawer}
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ display: { xs: "block", md: "none" }, flex: "0 0 auto" }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
            }}
            sx={{
              "& .MuiPaper-root": {
                minWidth: 120,
              },
            }}
          >
            <Toolbar />
            <List>
              <ListItemButton
                LinkComponent={Link}
                href="#"
                divider
                sx={{ py: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                  <MovieIcon />
                </ListItemIcon>
                Movies
              </ListItemButton>
              <ListItemButton
                LinkComponent={Link}
                href="#"
                divider
                sx={{ py: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                  <LiveTVIcon />
                </ListItemIcon>
                TV Shows
              </ListItemButton>
              <ListItemButton
                LinkComponent={Link}
                href="#"
                divider
                sx={{ py: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                  <PeopleIcon />
                </ListItemIcon>
                People
              </ListItemButton>
            </List>
          </Drawer>

          <Box
            sx={{
              flex: "1 1 0",
              display: "flex",
              alignItems: "center",
              columnGap: 2,
            }}
          >
            <Box component={Link} href="/" sx={{ mx: { xs: "auto", md: 0 } }}>
              <Image src="/icon.png" alt="App logo" width={32} height={32} />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, columnGap: 2 }}>
              <StyledTypography component={Link} variant="body1" href="#">
                Movies
              </StyledTypography>
              <StyledTypography component={Link} variant="body1" href="#">
                TV Shows
              </StyledTypography>
              <StyledTypography component={Link} variant="body1" href="#">
                People
              </StyledTypography>
            </Box>
          </Box>

          <Box sx={{ flex: "0 0 auto" }}>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
