"use client";
import {
  Box,
  alpha,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MovieItem from "@/components/utils/items/MovieItem";
import TVShowItem from "@/components/utils/items/TVShowItem";
import FetchedDetector from "@/components/utils/FetchedDetector";
import withPanel from "./withPanel";
import useWatchList from "@/utils/useWatchList";
import NotFoundData from "@/components/utils/NotFoundData";
import useAuthStatus from "@/utils/useAuthStatus";
import { useState } from "react";
import useWatchListItemDeleteMode from "./useWatchListDeleteMode";

const MoviesPanel = withPanel({
  type: "movie",
  ItemDisplayComponent: MovieItem,
});
const TVShowsPanel = withPanel({
  type: "tv",
  ItemDisplayComponent: TVShowItem,
});

export default function WatchListPage() {
  const { watchList, isLoadingWatchList } = useWatchList();
  const { authenticating, authenticated, unauthenticated } = useAuthStatus();
  const { deleteMode, toggleDeleteMode } = useWatchListItemDeleteMode();

  const movies = watchList && watchList.movies;
  const tvShows = watchList && watchList.tvShows;

  const moviesLength = movies?.length || 0;
  const tvShowsLength = tvShows?.length || 0;
  const dataEmpty = !moviesLength && !tvShowsLength;
  const needSignIn = dataEmpty && unauthenticated && !authenticating;

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <Typography variant="h5" fontWeight={700}>
          Your Watch List
        </Typography>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          variant={deleteMode ? "contained" : "outlined"}
          onClick={toggleDeleteMode}
        >
          Delete Mode
        </Button>
      </Box>
      <Box>
        {isLoadingWatchList || authenticating ? (
          <Box
            sx={{
              my: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: 1,
              }}
            >
              <CircularProgress />
              <Typography color="primary.main">
                Loading your watch list...
              </Typography>
            </Box>
          </Box>
        ) : needSignIn ? (
          <NotFoundData message="Could not retrieve your watch list. Please sign in first!" />
        ) : (
          <Box sx={{ mt: 2 }}>
            {moviesLength > 0 && (
              <MoviesPanel
                data={{ panelData: movies, panelType: "movie" }}
                title={<Title>Movies ({moviesLength})</Title>}
              />
            )}
            {tvShowsLength > 0 && (
              <TVShowsPanel
                data={{ panelData: tvShows, panelType: "tv" }}
                title={<Title>TV Shows ({tvShowsLength}) </Title>}
              />
            )}
          </Box>
        )}

        {dataEmpty && !isLoadingWatchList && authenticated && (
          <NotFoundData message="Your watch list is empty!" />
        )}

        <FetchedDetector />
      </Box>
    </Box>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <Box
      my={3}
      sx={{
        borderLeft: (theme) => `10px solid ${theme.palette.primary.main}`,
        px: 2,
        py: 1,
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
      }}
    >
      <Typography variant="h5" component="p" noWrap>
        {children}
      </Typography>
    </Box>
  );
}
