"use client";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Slide,
  Divider,
  styled,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from "@mui/icons-material/Tune";
import { useState, forwardRef } from "react";
import { TransitionProps } from "@mui/material/transitions";
import useSearchFilter from "@/utils/custom-hooks/useSearchFilter";
import useLoadingIndicator from "@/utils/custom-hooks/useLoadingIndicator";

// window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledToggleButton = styled(ToggleButton)({ textTransform: "none" });

export default function FloatingFilterButton() {
  const [open, setOpen] = useState(false);
  const {
    searchFor,
    searchResultPage,
    updateSearchFor,
    updateSearchResultPage,
    restoreDefault,
    saveOption,
  } = useSearchFilter();
  const isNavigatingPage = useLoadingIndicator();

  const toggleOpen = () => {
    if (!isNavigatingPage) {
      setOpen((prev) => !prev);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const v1Page = searchResultPage === "v1";

  return (
    <>
      <Button
        onClick={toggleOpen}
        color="primary"
        variant="contained"
        sx={{
          position: "fixed",
          top: "70%",
          right: 0,
          width: 50,
          height: 50,
          border: 1,
          borderRight: 0,
          borderColor: "secondary.main",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          overflow: "hidden",
          "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
          },
          "&::before": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 2s infinite 0.2s ease-in-out",
            border: "1px solid currentColor",
            content: '""',
          },
          "@keyframes ripple": {
            "0%": {
              transform: "scale(.1)",
              opacity: 1,
            },
            "100%": {
              transform: "scale(1)",
              opacity: 0,
            },
          },
          "& .MuiSvgIcon-root": {
            animation: "rotating 5s linear infinite",
          },
          "@keyframes rotating": {
            "0%": {
              transform: "rotate(0)",
            },
            "100%": {
              transform: "rotate(360deg)",
            },
          },
        }}
      >
        <SettingsIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        aria-labelledby="filter-dialog-title"
        aria-describedby="filter-dialog-description"
        PaperProps={{
          elevation: 0,
          sx: {
            width: { xs: "97%", sm: "85%", md: "70%" },
          },
        }}
      >
        <DialogTitle
          component={Typography}
          variant="h5"
          display="flex"
          alignItems="center"
          id="alert-dialog-title"
          sx={{ fontWeight: 500 }}
        >
          <TuneIcon color="inherit" fontSize="large" sx={{ mr: 1 }} />{" "}
          <span style={{ fontWeight: "inherit" }}>Filter Your Search</span>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box>
            <Typography variant="h6" mb={1}>
              Select search result page
            </Typography>
            <ToggleButtonGroup
              value={searchResultPage}
              exclusive
              onChange={(e, newValue) =>
                newValue && updateSearchResultPage(newValue)
              }
            >
              <StyledToggleButton value="v1" color="primary">
                V1 (Bugs)
              </StyledToggleButton>
              <StyledToggleButton value="v2" color="primary">
                V2 (Recommended)
              </StyledToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box mt={2}>
            <Typography variant="h6" mb={1}>
              Search for
            </Typography>
            <ToggleButtonGroup
              disabled={v1Page}
              value={v1Page || searchFor}
              exclusive
              onChange={(e, newValue) => newValue && updateSearchFor(newValue)}
            >
              <StyledToggleButton value="all" color="primary">
                All
              </StyledToggleButton>
              <StyledToggleButton value="movie" color="primary">
                Movies
              </StyledToggleButton>
              <StyledToggleButton value="tv" color="primary">
                TV Shows
              </StyledToggleButton>
              <StyledToggleButton value="person" color="primary">
                People
              </StyledToggleButton>
            </ToggleButtonGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={restoreDefault}>Restore default</Button>
          <Button
            variant="contained"
            onClick={() => {
              saveOption();
              handleClose();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
