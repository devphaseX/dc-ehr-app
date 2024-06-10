import { Footer } from './(home)/__components/footer';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const copyRightYear = new Date().getFullYear();
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">{children}</div>
      <div className="justify-items-end">
        <Footer copyRightYear={copyRightYear} />
      </div>
    </div>
  );
};

export default AppLayout;
