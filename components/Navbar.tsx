import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar component="nav" sx={{ columnGap: 2 }}>
        <Typography
          component={Link}
          variant="body1"
          href="#"
          sx={{ color: "text.primary" }}
        >
          Movies
        </Typography>
        <Typography
          component={Link}
          variant="body1"
          href="#"
          sx={{ color: "text.primary" }}
        >
          TV Shows
        </Typography>
        <Typography
          component={Link}
          variant="body1"
          href="#"
          sx={{ color: "text.primary" }}
        >
          People
        </Typography>

        <Box sx={{ ml: "auto" }}>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
