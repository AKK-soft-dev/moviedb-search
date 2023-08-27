"use client";
import PersonItem from "@/components/utils/PersonItem";
import withPageDataDisplay from "@/components/utils/withPageDataDisplay";

const PopularPersonDataDisplay = withPageDataDisplay({
  pageType: { type: "person", category: "popular" },
  ItemDisplayComponent: PersonItem,
});

export default PopularPersonDataDisplay;
