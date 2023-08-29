"use client";
import { Box } from "@mui/material";
import { useEffect } from "react";
import withResult from "../withResult";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";
import SearchInfo from "../../search-info";
import { DataType } from "../search-types";
import PersonItem from "@/components/utils/PersonItem";

const PeopleResult = withResult({
  type: "person",
  ItemDisplayComponent: PersonItem,
});

export default function PeopleSearchResult({ people }: { people: DataType }) {
  const { closeLoadingIndicator } = useLoadingIndicatorToggler();

  // Close loading indicator on first /search page load and on query changes
  useEffect(() => {
    closeLoadingIndicator();
  });

  const totalPeople = people.total_results;

  return (
    <Box>
      <Box sx={{ mt: 2, mb: 5 }}>
        <SearchInfo
          prefix={`People (${totalPeople > 99 ? "99+" : totalPeople}) :`}
        />
        <PeopleResult data={people} />
      </Box>
    </Box>
  );
}
