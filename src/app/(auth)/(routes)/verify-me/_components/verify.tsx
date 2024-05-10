import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const Verify = ({ email }: { email: string }) => {
  return (
    <div className="relative h-full flex items-center">
      <div className="space-y-6 max-w-[481px] w-full">
        <div className="absolute right-0 top-0 flex gap-x-2 items-center">
          <p className="text-neutral-500 font-medium text-base">
            Already a user?
          </p>
          <Button
            variant="link"
            className="text-primary-500 font-bold text-base p-0 h-fit w-fit"
          >
            Sign in
          </Button>
        </div>
        <div
          className="flex items-center justify-center
       w-16 h-16 bg-primary-50 rounded-full"
        >
          <Image
            src="/icons/sms-tracking.svg"
            alt="icon"
            width={32}
            height={32}
          />
        </div>
        <div className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-[32px] font-bold text-neutral-900">
              Verify your email address
            </h3>
            <p className="font-medium text-neutral-500 text-base">
              We just sent you a verification email link or code to you on
              <br />
              <span className="text-primary-500">{email}</span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-y-8">
            <div
              className="h-[64px] w-full flex items-center rounded-[10px]
           justify-center font-body bg-neutral-800 text-white font-bold text-base"
            >
              Check your mail inbox
            </div>
            <Button
              className="font-bold text-base text-primary-500 p-0 w-fit h-fit"
              variant="link"
            >
              Use verification code instead
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
