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
  SxProps,
} from "@mui/material";
import { MouseEventHandler } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LiveTVIcon from "@mui/icons-material/LiveTv";
import MovieIcon from "@mui/icons-material/LocalMovies";
import PeopleIcon from "@mui/icons-material/Group";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import MuiExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import {
  useDeferredValue,
  useEffect,
  useState,
  useRef,
  forwardRef,
} from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useDataQuery } from "react-data-query";
import { usePathname, useRouter } from "next/navigation";
import MyMenu from "./utils/MyMenu";
import MyDrawer from "./utils/MyDrawer";
import menus from "@/utils/menus";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";

const ExpandMoreIcon = styled(MuiExpandMoreIcon)<{ open: boolean }>(
  ({ open, theme }) => ({
    fontSize: "1.4rem",
    marginLeft: "2px",
    transition: theme.transitions.create("all"),
    ...(open && {
      transform: "rotate(180deg)",
    }),
  })
);

type NavMenuProps = {
  children: React.ReactNode;
  active: boolean;
  typographySx?: SxProps;
  containerSx?: SxProps;
  onClick: MouseEventHandler<HTMLDivElement>;
};

export type MenuType = keyof typeof menus;

const NavMenu = forwardRef<HTMLDivElement, NavMenuProps>((props, ref) => {
  const { children, active, typographySx, containerSx, onClick } = props;
  return (
    <Box
      onClick={onClick}
      component="div"
      ref={ref}
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        ...containerSx,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          userSelect: "none",
          ...typographySx,
          ...(active && {
            fontWeight: 700,
          }),
        }}
      >
        {children}
      </Typography>
      <ExpandMoreIcon open={active} color="inherit" />
    </Box>
  );
});
NavMenu.displayName = "NavMenu";

const filter = createFilterOptions<string>();

export const searchIndicatorKey = "search-indicator";

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [query, setQuery] = useState<string | null>(null);
  const [inputQuery, setInputQuery] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<{
    el: HTMLElement;
    menuName: MenuType;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const openMenu = Boolean(menuAnchorEl && menuAnchorEl.el);
  const { openLoadingIndicator } = useLoadingIndicatorToggler();
  const pathname = usePathname();
  const mainSegment = pathname.split("/")[1];

  const { data: isLoading } = useDataQuery(searchIndicatorKey, undefined, {
    initialData: false,
    autoFetchEnabled: false,
  });

  const toggleSearchBox = () => {
    setOpenSearchBox((prev) => !prev);
  };

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  const handleClose = () => {
    setOpenDrawer(false);
  };

  const handleMenuOpen = (event: any, menuName: keyof typeof menus) => {
    setMenuAnchorEl({ el: event.currentTarget as HTMLElement, menuName });
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  useEffect(() => {
    openSearchBox && inputRef.current?.focus();
  }, [openSearchBox]);

  const deferredQuery = useDeferredValue<string | undefined>(inputQuery);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    fetch(`/api/search?query=${inputQuery}`, { signal: abortController.signal })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const options = data.results.map(
          (res: { name?: string; title?: string }) => res.name || res.title
        );
        setOptions(Array.from(new Set(options)));
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
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
          <MyDrawer open={openDrawer} onClose={handleClose} />

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
              {Object.keys(menus).map((menu) => {
                const active =
                  mainSegment &&
                  ((pathname === "/person" && menu === "People") ||
                    new RegExp(mainSegment, "i").test(menu.replace(" ", "")));
                return (
                  <NavMenu
                    key={menu}
                    active={!!(menuAnchorEl && menuAnchorEl.menuName === menu)}
                    onClick={(e) => handleMenuOpen(e, menu as MenuType)}
                    containerSx={{
                      ...(active && { color: "primary.main" }),
                    }}
                  >
                    {menu}
                  </NavMenu>
                );
              })}
              <MyMenu
                open={openMenu}
                onClose={handleMenuClose}
                anchorEl={menuAnchorEl && menuAnchorEl.el}
                mainMenu={menuAnchorEl && menuAnchorEl.menuName}
              />
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
          display: isLoading ? "block" : "none",
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
              openLoadingIndicator();
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
