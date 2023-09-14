"use client";
import { Box, LinearProgress, Modal, useTheme } from "@mui/material";
import useLoadingIndicator from "@/utils/custom-hooks/useLoadingIndicator";

// Use only once
export default function PageTransitionIndicator() {
  const theme = useTheme();
  const isLoading = useLoadingIndicator();

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          display: isLoading ? "block" : "none",
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.modal + 2,
        }}
      >
        <LinearProgress />
      </Box>
      {/* <Modal open={Boolean(isLoading)}>
        <Box height={0} />
      </Modal> */}
    </>
  );
}
