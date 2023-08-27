import {
  Box,
  Drawer,
  Toolbar,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails,
  Typography,
  ListItemButton as MuiListItemButton,
  styled,
  alpha,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MenuType } from "../Navbar";
import menus from "@/utils/menus";
import Link from "next/link";

const drawerWidth = 260;

const Accordion = styled(MuiAccordion)({
  backgroundColor: "transparent",
  boxShadow: "none",
  "&::before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: 0,
  },
});

const AccordionSummary = styled(MuiAccordionSummary)({
  minHeight: 50,
  maxHeight: 50,
  "&.Mui-expanded": {
    minHeight: 50,
    maxHeight: 50,
  },
});

const StyledTypography = styled(Typography)({ fontWeight: 400 });

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  paddingLeft: 10,
  "&:last-of-type": {
    marginBottom: 0,
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  "&.Mui-selected": {
    color: theme.palette.primary.main,
  },
}));

function MyDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer
      PaperProps={{ elevation: 0 }}
      sx={{
        width: drawerWidth,
        "& .MuiPaper-root": {
          width: drawerWidth,
        },
      }}
      variant="temporary"
      open={open}
      onClose={onClose}
    >
      <Toolbar />
      <Box>
        {Object.keys(menus).map((menu, i) => (
          <Accordion elevation={0} key={menu}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" alignItems="center" columnGap={1}>
                {menus[menu as MenuType]?.icon}
                <StyledTypography variant="body1">{menu}</StyledTypography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ py: 0 }}>
              {menus[menu as MenuType]?.subMenus?.map(({ name, link }) => (
                <Box
                  key={name}
                  component={Link}
                  href={link}
                  sx={{ color: "text.primary", textDecoration: "none" }}
                >
                  <ListItemButton
                    selected={name === "E-Learning"}
                    sx={{ mb: 2 }}
                  >
                    <Typography variant="body2">{name}</Typography>
                  </ListItemButton>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Drawer>
  );
}

export default MyDrawer;
