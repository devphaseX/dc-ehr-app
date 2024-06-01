type LayoutProps = {
  navbar: React.ReactNode;
  children: React.ReactNode;
};

const Layout = ({ navbar, children }: LayoutProps) => {
  return (
    <div>
      {navbar}
      {children}
    </div>
  );
};

export default Layout;
