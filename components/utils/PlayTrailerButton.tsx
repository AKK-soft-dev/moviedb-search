"use client";

import {
  Button,
  ButtonProps,
  Box,
  CircularProgress,
  Popper,
  Paper,
  Fade,
  alpha,
  useTheme,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Carousel from "react-material-ui-carousel";
import { useState, useRef, useEffect } from "react";
import { useDataQuery } from "react-data-query";

type TrailerResultType = {
  id: number;
  results: Array<{
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number; // 1080
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }>;
};

function LoadingIndicator() {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      sx={{ transform: "translate(-50%, -50%)" }}
    >
      <CircularProgress />
    </Box>
  );
}

export default function PlayTrailerButton({
  url,
  buttonProps,
}: {
  url: string;
  buttonProps?: ButtonProps;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const { data, isFetching, refetch } = useDataQuery<TrailerResultType>(
    url,
    () => fetch(url).then((res) => res.json()),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      autoFetchEnabled: false,
    }
  );

  useEffect(() => {
    if (!data && open) {
      refetch();
    }
  }, [open]);

  const trailers = data?.results;
  const trailerExist = trailers && trailers.length;

  return (
    <>
      <Button
        ref={btnRef}
        startIcon={open ? <CloseIcon /> : <PlayArrowIcon />}
        color="inherit"
        variant="outlined"
        {...buttonProps}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Close" : "Play"} Trailer
      </Button>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={btnRef.current}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper
              elevation={4}
              sx={{
                display: "flex",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                border: 1,
                borderColor: "secondary.main",
              }}
            >
              <Box>
                <Carousel
                  sx={{
                    width: { xs: "300px", sm: "450px" },
                    backgroundColor: "background.default",
                  }}
                  fullHeightHover={false}
                  navButtonsAlwaysVisible={trailers && trailers.length > 1}
                  animation="slide"
                  autoPlay={false}
                  navButtonsProps={{
                    style: {
                      color: "#fff",
                      display: trailers && trailers.length ? "block" : "none",
                      backgroundColor: alpha(primaryColor, 0.7),
                    },
                  }}
                  indicatorContainerProps={{
                    style: {
                      marginTop: 0,
                    },
                  }}
                  activeIndicatorIconButtonProps={{
                    style: {
                      color: primaryColor,
                    },
                  }}
                >
                  {trailerExist ? (
                    trailers.map(({ id, key }) => (
                      <Box
                        key={id}
                        component="iframe"
                        sx={{
                          width: "100%",
                          aspectRatio: "16/9",
                          backgroundColor: "background.default",
                        }}
                        src={`https://www.youtube.com/embed/${key}?cc_load_policy=1&cc_lang_pref=en`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ))
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        aspectRatio: "16/9",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: isFetching ? "none" : "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SentimentVeryDissatisfiedIcon />
                        <Typography>Sorry! No trailer found!</Typography>
                      </Box>
                    </Box>
                  )}
                </Carousel>
              </Box>
              {isFetching && <LoadingIndicator />}
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}
