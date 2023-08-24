import { Box } from "@mui/material";
import { TabPanelProps } from "./tabs";
import BSGridItem from "@/components/utils/BSGridItem";
import TVShowItem from "@/components/utils/TVShowItem";

export default function TVShowsPanel(props: TabPanelProps) {
  const { data, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-hidden={value !== index}
      id={`movies-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>
        <Box component="div" className="row g-2">
          {data.results?.map((res) => (
            <BSGridItem key={res.id}>
              <TVShowItem tv={res} />
            </BSGridItem>
          ))}
        </Box>
      </Box>
    </div>
  );
}
