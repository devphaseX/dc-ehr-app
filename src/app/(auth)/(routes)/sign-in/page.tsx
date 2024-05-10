import { Banner } from '../../_components/banner';
import SignInForm from './form';

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
              <SignInForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
