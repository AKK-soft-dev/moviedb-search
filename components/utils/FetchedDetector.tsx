"use client";
import { searchIndicatorKey } from "@/components/Navbar";
import { useEffect } from "react";
import { useDataQueryMagic } from "react-data-query";

export default function FetchedDetector() {
  const { setQueryData } = useDataQueryMagic();

  useEffect(() => {
    setQueryData(searchIndicatorKey, () => false);
  });

  return <></>;
}
