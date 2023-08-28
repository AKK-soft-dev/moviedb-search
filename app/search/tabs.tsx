"use client";
import { Box, Tabs, Tab, Badge, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import SearchingIndicatorSkeleton from "@/components/skeletons/LoadingCategorizedPageSkeleton";
import LiveTVIcon from "@mui/icons-material/LiveTv";
import MovieIcon from "@mui/icons-material/LocalMovies";
import PeopleIcon from "@mui/icons-material/Group";
import withPanel from "./withPanel";
import MovieItem from "@/components/utils/MovieItem";
import TVShowItem from "@/components/utils/TVShowItem";
import PersonItem from "@/components/utils/PersonItem";
import { useSearchParams } from "next/navigation";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";

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

const tabs = ["movie", "tv", "person"];

const PeoplePanel = withPanel({
  type: "person",
  ItemDisplayComponent: PersonItem,
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
  const searchParams = useSearchParams();
  const forTab = searchParams.get("for") || "movie";
  const [tab, setTab] = useState<number>(
    tabs.findIndex((tab) => tab === forTab) || 0
  );
  const { closeLoadingIndicator } = useLoadingIndicatorToggler();
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // Close loading indicator on first /search page load and on query changes
  useEffect(() => {
    closeLoadingIndicator();
  });

  return (
    <Box>
      <Tabs
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        value={tab}
        onChange={handleTabChange}
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
          <MoviesPanel data={movies} value={tab} index={0} />
          <TVShowsPanel data={shows} value={tab} index={1} />
          <PeoplePanel data={people} value={tab} index={2} />
        </Box>
      </Suspense>
    </Box>
  );
}
