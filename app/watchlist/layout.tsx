import FetchedDetector from "@/components/utils/FetchedAndPageLoadedDetector";
import { Container, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch List",
  description: "View movies and tv shows in your watch list.",
};
export default function WatchListPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      {children}
      <FetchedDetector />
    </Container>
  );
}
