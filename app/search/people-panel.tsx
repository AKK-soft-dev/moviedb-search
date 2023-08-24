import { Box } from "@mui/material";
import { TabPanelProps } from "./tabs";
import PeopleResultItem from "./item/people-res-item";
import BSGridItem from "@/components/utils/BSGridItem";

export default function PeoplePanel(props: TabPanelProps) {
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
              <PeopleResultItem person={res} />
            </BSGridItem>
          ))}
        </Box>
      </Box>
    </div>
  );
}
