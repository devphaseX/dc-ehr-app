import { Footer } from "./(home)/__components/footer";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const copyRightYear = new Date().getFullYear();
  return (
    <>
      {children}
      <div className="justify-items-end">
        <Footer copyRightYear={copyRightYear} />
      </div>
    </>
  );
};

export default AppLayout;
