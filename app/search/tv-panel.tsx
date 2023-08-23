import { Box, Typography } from "@mui/material";
import { TabPanelProps } from "./tabs";

export default function TVShowsPanel(props: TabPanelProps) {
  const { value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tv-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>TV Shows Panel</Typography>
        </Box>
      )}
    </div>
  );
}
