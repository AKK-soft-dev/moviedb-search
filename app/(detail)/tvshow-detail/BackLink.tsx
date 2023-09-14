"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useLoadingIndicatorToggler from "@/utils/custom-hooks/useLoadingIndicatorToggler";

export default function BackLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const { openLoadingIndicator } = useLoadingIndicatorToggler();
  return (
    <Box display="inline-block">
      <Typography
        onClick={openLoadingIndicator}
        component={Link}
        href={href}
        display="flex"
        alignItems="center"
        columnGap={1}
        color="primary"
        sx={{
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        <ArrowBackIcon />
        {children}
      </Typography>
    </Box>
  );
}
