import type { Metadata } from "next";
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

export default function Movies() {
  return <h1>This is tv show page!</h1>;
}
