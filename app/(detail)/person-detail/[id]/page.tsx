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
    title: "Person Name",
  };
};

export default function Movies() {
  notFound();
  return <h1>This is person page!</h1>;
}
