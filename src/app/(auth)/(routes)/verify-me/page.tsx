import { Banner } from '../../_components/banner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Verify } from './_components/verify';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function VerifyMePage() {
  const session = await auth();
  //   if (session?.user) return redirect('/sign-in');

  console.log({ session });

  return (
    <div className="h-screen w-full">
      <div className="p-8 w-full h-full">
        <div className="max-w-[1440px] w-full mx-auto h-full">
          <div className="h-full flex w-full gap-x-[135px]">
            <div className="flex-1 h-full">
              <Banner bannerImgUrl="" />
            </div>
            <div className="flex-1 h-full self-stretch">
              <Verify
                email={
                  (session?.user?.email as string) ??
                  'ayomidelawal700@gmail.com'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
