"use client";
import PersonItem from "@/components/utils/items/PersonItem";
import withCategorizedPage from "@/components/utils/withCategorizedPage";

const PopularPeople = withCategorizedPage({
  title: "Popular People",
  pageType: { type: "person", category: "popular" },
  ItemDisplayComponent: PersonItem,
});

export default PopularPeople;
