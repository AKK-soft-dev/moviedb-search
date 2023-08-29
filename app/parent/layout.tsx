import { Container } from "@mui/material";
import { Metadata } from "next";
import UseSearchParam from "./UseSearchParam";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Parent",
  description: "Search movies, tv shows and people from around the world!",
};

export default async function SearchPage({
  children,
}: {
  children: React.ReactNode;
}) {
  redirect("/parent/child");
  return (
    <Container>
      <Suspense fallback={<div>Loading</div>}>
        <UseSearchParam />
      </Suspense>

      {children}
    </Container>
  );
}
