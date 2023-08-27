import {
  Popover,
  Box,
  Grid,
  ListItemButton as MuiListItemButton,
  styled,
  alpha,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { MenuType } from "../Navbar";
import menus from "@/utils/menus";

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1.5, 1),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  "&:active": {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
  "&.Mui-selected": {
    color: theme.palette.primary.main,
  },
}));

type MyMenuProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  mainMenu: MenuType | null;
};

function MyMenu({ open, anchorEl, onClose, mainMenu }: MyMenuProps) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      keepMounted={false}
      sx={{
        "& .MuiPaper-root": {
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          width: 150,
          p: 1,
          borderTop: 3,
          borderColor: "primary.main",
          boxShadow: 6,
          mt: 1,
        },
      }}
    >
      <Grid container spacing={1}>
        {mainMenu &&
          menus[mainMenu].subMenus?.map(({ name, link }) => (
            <Grid item xs={12} key={name}>
              <Box
                component={Link}
                href={link}
                sx={{ textDecoration: "none" }}
                onClick={onClose}
              >
                <ListItemButton>
                  <Typography variant="body2" color="text.primary">
                    {name}
                  </Typography>
                </ListItemButton>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Popover>
  );
}

export default MyMenu;
