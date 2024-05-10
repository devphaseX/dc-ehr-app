import { Nav } from '@/components/nav';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function LayoutPage({ children }: AppLayoutProps) {
  return (
    <div className="relative">
      <Nav />
      <div className="h-[88px]"></div>
      {children}
    </div>
  );
}
