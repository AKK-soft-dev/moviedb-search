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
    title: "Movie Name",
  };
};

export default function Movie() {
  notFound();
  return <h1>This is movie page!</h1>;
}
