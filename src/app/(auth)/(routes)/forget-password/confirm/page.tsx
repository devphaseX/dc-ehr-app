'use client';

import Image from 'next/image';

const ResetPasswordLinkSentPage = ({ email }: { email: string }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-y-8 flex flex-col items-center max-w-[584px] w-full mx-auto">
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
        <div className="space-y-[48px] w-full flex flex-col items-center">
          <div className="space-y-4 max-w-[481px] mx-auto text-center">
            <h3 className="text-3xl font-bold text-neutral-900">
              We have sent you a reset link
            </h3>
            <p className="font-medium text-neutral-500 text-lg">
              We just sent you a verification email link or code to you on
              <br />
              <span className="text-primary-500">{email}</span>
            </p>
          </div>

          <div
            className="w-[235px] h-[64px]  flex items-center rounded-[10px]
           justify-center font-body bg-neutral-800 text-white font-bold text-lg"
          >
            Check email inbox
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordLinkSentPage;
