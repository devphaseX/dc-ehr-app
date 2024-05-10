import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const Verify = ({ email }: { email: string }) => {
  return (
    <div className="space-y-6">
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
      <div className="space-y-[48px]">
        <div className="space-y-4">
          <h3 className="text-4xl font-bold text-neutral-900">
            Verify your email address
          </h3>
          <p className="font-medium text-neutral-500 text-lg">
            We just sent you a verification email link or code to you on
            <br />
            <span className="text-primary-500">{email}</span>
          </p>
        </div>
        <div className="flex flex-col items-center gap-y-8">
          <div
            className="h-[64px] w-full flex items-center rounded-[10px]
           justify-center font-body bg-neutral-800 text-white font-bold text-lg"
          >
            Check your mail inbox
          </div>
          <Button
            className="font-bold text-lg text-primary-500 p-0 w-fit h-fit"
            variant="link"
          >
            Use verification code instead
          </Button>
        </div>
      </div>

      <div></div>
    </div>
  );
};
