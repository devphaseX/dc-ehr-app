type LayoutProps = {
  navbar: React.ReactNode;
  children: React.ReactNode;
};

const Layout = ({ navbar, children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {navbar}
      {children}
    </div>
  );
};

export default Layout;
