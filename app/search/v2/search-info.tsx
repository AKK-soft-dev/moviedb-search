"use client";
import { useSearchParams } from "next/navigation";
import { Typography, Box, alpha } from "@mui/material";

export default function SearchInfo({ prefix }: { prefix: string }) {
  const searchParams = useSearchParams();
  return (
    <Box
      my={3}
      sx={{
        borderLeft: (theme) => `10px solid ${theme.palette.primary.main}`,
        px: 2,
        py: 1,
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
      }}
    >
      <Typography variant="h6" noWrap>
        {prefix} {searchParams.get("query")}{" "}
      </Typography>
    </Box>
  );
}
