import type { Metadata } from "next";
import { notFound } from "next/navigation";
type Props = {
  params: { id: string };
  // searchParams: { [key: string]: string | string[] | undefined }
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  return {
    title: "TV Show Name",
  };
};

export default function TVShow() {
  notFound();
  return <h1>This is TV Show page!</h1>;
}
