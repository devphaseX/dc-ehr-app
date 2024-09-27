import { Footer } from "./(home)/__components/footer";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const copyRightYear = new Date().getFullYear();
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 flex flex-col">{children}</div>
      <div className="justify-items-end">
        <Footer copyRightYear={copyRightYear} />
      </div>
    </div>
  );
};

export default AppLayout;
