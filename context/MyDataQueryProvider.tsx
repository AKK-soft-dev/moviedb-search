"use client";
import { DataQueryProvider } from "react-data-query";

export default function MyDataQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DataQueryProvider>{children}</DataQueryProvider>;
}
