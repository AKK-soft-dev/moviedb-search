"use client";
import useLoadingIndicatorToggler from "@/utils/custom-hooks/useLoadingIndicatorToggler";
import { useEffect } from "react";

export default function FetchedAndPageLoadedDetector() {
  const { closeLoadingIndicator } = useLoadingIndicatorToggler();

  useEffect(() => {
    closeLoadingIndicator();
  });

  useEffect(() => {
    const handler = () => {
      closeLoadingIndicator();
    };
    window.addEventListener("popstate", handler);

    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, [closeLoadingIndicator]);
  return <></>;
}
