"use client";
import { useSearchParams } from "next/navigation";

export default function SearchResult() {
  const searchParams = useSearchParams();
  return (
    <>
      <h1>Search - {searchParams.get("query")} </h1>
    </>
  );
}
