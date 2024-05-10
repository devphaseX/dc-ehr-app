type ResourceTypeLayoutProps = {
  head: React.ReactNode;
  children: React.ReactNode;
};

export default function ResourceTypeLayout({
  head,
  children,
}: ResourceTypeLayoutProps) {
  return <div>{head}</div>;
}
