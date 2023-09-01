type Props = {
  params: { id: string };
};

export default function Seasons({ params: { id } }: Props) {
  return <h1>{id}</h1>;
}
