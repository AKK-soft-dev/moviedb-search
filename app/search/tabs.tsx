"use client";
import { Box, Tabs, Tab, Badge, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDataQueryMagic } from "react-data-query";
import { Suspense } from "react";
import SearchingIndicatorSkeleton from "@/components/skeletons/SearchingIndicatorSkeleton";
import MoviesPanel from "./movies-panel";
import TVShowsPanel from "./tv-panel";
import PeoplePanel from "./people-panel";
import LiveTVIcon from "@mui/icons-material/LiveTv";
import MovieIcon from "@mui/icons-material/LocalMovies";
import PeopleIcon from "@mui/icons-material/Group";

export interface TabPanelProps {
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SearchPageTabs({
  movies = 0,
  shows = 0,
  people = 0,
}: {
  movies: number;
  shows: number;
  people: number;
}) {
  const [value, setValue] = useState(0);
  const { setQueryData } = useDataQueryMagic();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setQueryData("search-indicator", (prev) => {
      console.log({ prev });
      return false;
    });
  });

  return (
    <Box>
      <Tabs
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab
          icon={
            <Badge badgeContent={movies} color="secondary">
              <MovieIcon />
            </Badge>
          }
          label={<Typography>Movies</Typography>}
          iconPosition="start"
          {...a11yProps(0)}
        />
        <Tab
          icon={
            <Badge badgeContent={shows} color="secondary">
              <LiveTVIcon />
            </Badge>
          }
          label={<Typography>TV Shows</Typography>}
          iconPosition="start"
          {...a11yProps(1)}
        />
        <Tab
          icon={
            <Badge badgeContent={people} color="secondary">
              <PeopleIcon />
            </Badge>
          }
          label={<Typography>People</Typography>}
          iconPosition="start"
          {...a11yProps(2)}
        />
      </Tabs>
      <Suspense fallback={<SearchingIndicatorSkeleton />}>
        <Box sx={{ mt: 2 }}>
          <MoviesPanel value={value} index={0} />
          <TVShowsPanel value={value} index={1} />
          <PeoplePanel value={value} index={2} />
        </Box>
      </Suspense>
    </Box>
  );
}
