import { Box, Container, Typography, Button } from "@mui/material";
import { Metadata } from "next";
import Update from "./Update";

export const metadata: Metadata = {
  title: "Child",
  description: "Search movies, tv shows and people from around the world!",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const { query, page = 1 } = searchParams;
  console.log("child", { query, page });

  return (
    <Container>
      <Box height={100} mt={20}>
        <Typography>This is page in child</Typography>
        <Update />
      </Box>
    </Container>
  );
}
