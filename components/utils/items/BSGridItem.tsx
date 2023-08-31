export default function GridItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-4 col-sm-3 col-md-2 col-lg-2 col-xl-3">{children}</div>
  );
}
