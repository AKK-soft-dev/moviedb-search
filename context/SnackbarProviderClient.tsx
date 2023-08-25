"use client";
import { SnackbarProvider } from "notistack";

export default function SnackbarProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}
