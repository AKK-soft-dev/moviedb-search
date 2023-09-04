"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { SeasonType } from "./tvshow-type";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";
import SeasonOverviewItem from "./SeasonOveriewItem";

export default function LastSeason({
  tvShowId,
  tvShowName,
  data,
}: {
  tvShowName: string;
  tvShowId: string;
  data: SeasonType;
}) {
  const { openLoadingIndicator } = useLoadingIndicatorToggler();
  return (
    <Box
      component="section"
      sx={{ backgroundColor: "background.paper", py: 5 }}
    >
      <Container>
        <Box
          display="flex"
          mb={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h5"
            fontWeight={500}
            display="inline-block"
            sx={{
              borderBottom: "3px solid",
              borderBottomColor: "secondary.main",
            }}
          >
            Last Season
          </Typography>
          <Button
            LinkComponent={Link}
            href={`${tvShowId}/seasons`}
            onClick={openLoadingIndicator}
          >
            View All Seasons
          </Button>
        </Box>
        <SeasonOverviewItem
          imgBgDefault
          tvShowId={tvShowId}
          data={data}
          tvShowName={tvShowName}
        />
      </Container>
    </Box>
  );
}
