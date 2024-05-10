import { Banner } from '../../_components/banner';
import SignUpForm from './form';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full">
      <div className="p-8 w-full h-full">
        <div className="max-w-[1440px] w-full mx-auto h-full">
          <div className="h-full flex w-full gap-x-[135px]">
            <div className="flex-1 h-[960px]">
              <Banner bannerImgUrl="" />
            </div>
            <div className="flex-1 pr-[80px] self-stretch">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
