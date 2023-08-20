import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  return (
    <AppBar position="sticky" elevation={1}>
      <Container>
        <Toolbar component="nav" sx={{ columnGap: 2 }} disableGutters>
          <Typography
            component={Link}
            variant="body1"
            href="#"
            sx={{
              position: "relative",
              top: 0,
              left: 0,
              color: "text.primary",
              transition: "transform",
              "&:hover": {
                transform: "scale(0.95)",
              },
            }}
          >
            Movies
          </Typography>
          <Typography
            component={Link}
            variant="body1"
            href="#"
            sx={{
              position: "relative",
              top: 0,
              left: 0,
              color: "text.primary",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(0.95)",
              },
            }}
          >
            TV Shows
          </Typography>
          <Typography
            component={Link}
            variant="body1"
            href="#"
            sx={{
              position: "relative",
              top: 0,
              left: 0,
              color: "text.primary",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(0.95)",
              },
            }}
          >
            People
          </Typography>

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
