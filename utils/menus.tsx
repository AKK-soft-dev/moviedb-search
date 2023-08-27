import LiveTVIcon from "@mui/icons-material/LiveTv";
import MovieIcon from "@mui/icons-material/LocalMovies";
import PeopleIcon from "@mui/icons-material/Group";

const menus = {
  Movies: {
    subMenus: [
      { name: "Popular", link: "/movie" },
      { name: "Now Playing", link: "/movie/now-playing" },
      { name: "Upcoming", link: "/movie/upcoming" },
      { name: "Top Rated", link: "/movie/top-rated" },
    ],
    icon: <MovieIcon />,
  },
  ["TV Shows"]: {
    subMenus: [
      { name: "Popular", link: "/tvshow" },
      { name: "Airing Today", link: "/tvshow/airing-today" },
      { name: "On TV", link: "/tvshow/on-the-air" },
      { name: "Top Rated", link: "/tvshow/top-rated" },
    ],
    icon: <LiveTVIcon />,
  },
  People: {
    subMenus: [{ name: "Popular People", link: "/person" }],
    icon: <PeopleIcon />,
  },
};

export default menus;
