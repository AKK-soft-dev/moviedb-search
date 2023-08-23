import { Box, Typography } from "@mui/material";
import { TabPanelProps } from "./tabs";

export default function PeoplePanel(props: TabPanelProps) {
  const { value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`people-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>People Panel</Typography>
        </Box>
      )}
    </div>
  );
}
