import { Container, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch List",
  description: "Explore movies and tv shows in your watch list.",
};
export default function WatchListPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Typography variant="h5" my={2}>
        Your Watch List
      </Typography>
      {children}
    </Container>
  );
}
