type LayoutProps = {
  navbar: React.ReactNode;
  children: React.ReactNode;
};

const Layout = ({ navbar, children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-[1024px]">
      {navbar}
      <div className="flex-1 relative">
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
