"use client";
import useLoadingIndicatorToggler from "@/utils/useLoadingIndicatorToggler";
import { useEffect } from "react";

export default function FetchedDetector() {
  const { closeLoadingIndicator } = useLoadingIndicatorToggler();

  useEffect(() => {
    closeLoadingIndicator();
  });

  return <></>;
}
