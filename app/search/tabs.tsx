"use client";
import { Box, Tabs, Tab, Badge, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDataQueryMagic } from "react-data-query";
import { Suspense } from "react";
import SearchingIndicatorSkeleton from "@/components/skeletons/SearchingIndicatorSkeleton";
import LiveTVIcon from "@mui/icons-material/LiveTv";
import MovieIcon from "@mui/icons-material/LocalMovies";
import PeopleIcon from "@mui/icons-material/Group";
import withPanel from "./withPanel";
import PeopleResultItem from "./item/people-res-item";
import MovieItem from "@/components/utils/MovieItem";
import TVShowItem from "@/components/utils/TVShowItem";

type DataType = {
  results: any[];
  total_results: number;
  total_pages: number;
};
export interface TabPanelProps {
  data: DataType;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PeoplePanel = withPanel({
  type: "person",
  ItemDisplayComponent: PeopleResultItem,
});

const MoviesPanel = withPanel({
  type: "movie",
  ItemDisplayComponent: MovieItem,
});
const TVShowsPanel = withPanel({
  type: "tv",
  ItemDisplayComponent: TVShowItem,
});

export default function SearchPageTabs({
  movies,
  shows,
  people,
}: {
  movies: DataType;
  shows: DataType;
  people: DataType;
}) {
  const [value, setValue] = useState(0);
  const { setQueryData } = useDataQueryMagic();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setQueryData("search-indicator", () => {
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
            <Badge badgeContent={movies.total_results} color="secondary">
              <MovieIcon />
            </Badge>
          }
          label={<Typography>Movies</Typography>}
          iconPosition="start"
          {...a11yProps(0)}
        />
        <Tab
          icon={
            <Badge badgeContent={shows.total_results} color="secondary">
              <LiveTVIcon />
            </Badge>
          }
          label={<Typography>TV Shows</Typography>}
          iconPosition="start"
          {...a11yProps(1)}
        />
        <Tab
          icon={
            <Badge badgeContent={people.total_results} color="secondary">
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
          <MoviesPanel data={movies} value={value} index={0} />
          <TVShowsPanel data={shows} value={value} index={1} />
          <PeoplePanel data={people} value={value} index={2} />
        </Box>
      </Suspense>
    </Box>
  );
}
