"use client";
import { redirect, useSearchParams } from "next/navigation";
import { Box, Paper, Typography } from "@mui/material";
import { useEffect } from "react";

export default function UseSearchParam() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const page = searchParams.get("page");
  console.log("parent", { query, page });

  useEffect(() => {
    console.log("query and page change");
  }, [query, page]);

  if (query === "blah") {
    redirect('/parent/child?query="blah"');
  }

  return (
    <Paper>
      <Box height={100}>
        <Typography>This is layout in parent</Typography>
      </Box>
    </Paper>
  );
}
