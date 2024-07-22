type LayoutProps = {
  navbar: React.ReactNode;
  children: React.ReactNode;
};

const Layout = ({ navbar, children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-[1024px]">
      {navbar}
      <div className="relative h-1 flex-1">{children}</div>
    </div>
  );
};

export default Layout;
