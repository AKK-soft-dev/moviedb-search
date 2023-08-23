import { Box, Typography } from "@mui/material";
import { TabPanelProps } from "./tabs";

export default function MoviesPanel(props: TabPanelProps) {
  const { value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`movies-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>Movies Panel</Typography>
        </Box>
      )}
    </div>
  );
}
