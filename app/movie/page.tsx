import type { Metadata } from "next";
type Props = {
  params: { id: string };
  // searchParams: { [key: string]: string | string[] | undefined }
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  return {
    title: "Movie",
  };
};

export default function Movies() {
  return <h1>This is movie page!</h1>;
}
