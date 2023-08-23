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
  ListItemButtonProps,
  ListItemIcon,
  alpha,
  TextField,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LiveTVIcon from "@mui/icons-material/LiveTv";
import MovieIcon from "@mui/icons-material/LocalMovies";
import PeopleIcon from "@mui/icons-material/Group";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { useDeferredValue, useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useDataQuery, useDataQueryMagic } from "react-data-query";
import { useRouter } from "next/navigation";

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

const StyledListItemButton = styled(ListItemButton)<
  ListItemButtonProps & { href: string }
>(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.dark, 0.2),
  },
}));

const filter = createFilterOptions<string>();

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [query, setQuery] = useState<string | null>(null);
  const [inputQuery, setInputQuery] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { data: isSearching } = useDataQuery("search-indicator", undefined, {
    initialData: false,
    autoFetchEnabled: false,
  });
  const { setQueryData } = useDataQueryMagic();

  const toggleSearchBox = () => {
    setOpenSearchBox((prev) => !prev);
  };

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  const handleClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    openSearchBox && inputRef.current?.focus();
  }, [openSearchBox]);

  useEffect(() => {
    router.prefetch("/search");
  }, []);

  const deferredQuery = useDeferredValue<string | undefined>(inputQuery);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/search?query=${inputQuery}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const options = data.results.map(
          (res: { name?: string; title?: string }) => res.name || res.title
        );
        setOptions(Array.from(new Set(options)));
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [deferredQuery]);

  return (
    <AppBar position="sticky" sx={{ top: 0 }} elevation={1}>
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
            open={openDrawer}
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
              <StyledListItemButton LinkComponent={Link} href="#" divider>
                <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                  <MovieIcon />
                </ListItemIcon>
                Movies
              </StyledListItemButton>
              <StyledListItemButton LinkComponent={Link} href="#" divider>
                <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                  <LiveTVIcon />
                </ListItemIcon>
                TV Shows
              </StyledListItemButton>
              <StyledListItemButton LinkComponent={Link} href="#" divider>
                <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                  <PeopleIcon />
                </ListItemIcon>
                People
              </StyledListItemButton>
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
            <IconButton onClick={toggleSearchBox}>
              {openSearchBox ? <CloseIcon /> : <SearchIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Box
        sx={{
          position: "absolute",
          display: isSearching ? "block" : "none",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <LinearProgress />
      </Box>
      <Box
        component="div"
        className="search-box"
        display={openSearchBox ? "block" : "none"}
        sx={{
          background: (theme) => theme.palette.background.default,
        }}
      >
        <Autocomplete
          loading={loading}
          autoFocus
          autoSelect
          freeSolo
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          options={options}
          value={query}
          inputValue={inputQuery}
          onChange={(_event, newValue) => {
            setQuery(newValue);
            if (newValue) {
              setOpenSearchBox(false);
              setQueryData("search-indicator", () => true);
              router.push(`/search?query=${newValue}`);
            }
          }}
          onInputChange={(_e, newInput) => {
            setInputQuery(newInput);
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option);
            if (inputValue !== "" && !isExisting) {
              filtered.push(inputValue);
            }

            return filtered;
          }}
          renderOption={(props, option) => {
            return (
              <Box component="li" {...props}>
                <SearchIcon sx={{ mr: 1 }} /> {option}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 0,
                },
              }}
              placeholder="Search movies, shows and people..."
              InputProps={{
                ...params.InputProps,
                inputRef: inputRef,
                startAdornment: <SearchIcon />,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>
    </AppBar>
  );
}
