"use client";
import { Box, useTheme, SxProps, alpha } from "@mui/material";

export default function GradientBackground({
  darker = false,
  children,
  sx,
}: {
  darker?: boolean;
  sx?: SxProps;
  children?: React.ReactNode;
}) {
  const theme = useTheme();
  const defaultBackground = theme.palette.background.default;
  const alphaValue = darker ? 0.85 : 0.8;
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to right, ${alpha(
          defaultBackground,
          alphaValue
        )} 0%, ${alpha(defaultBackground, alphaValue)} 100%)`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
