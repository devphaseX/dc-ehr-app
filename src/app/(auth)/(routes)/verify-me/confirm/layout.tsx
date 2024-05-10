import { Banner } from '@/app/(auth)/_components/banner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full">
      <div className="p-8 w-full h-full">
        <div className="max-w-[1440px] w-full mx-auto h-full">
          <div className="h-full flex w-full gap-x-[135px]">
            <div className="flex-1 h-[960px]">
              <Banner bannerImgUrl="" />
            </div>
            <div className="flex-1 h-full self-stretch">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
