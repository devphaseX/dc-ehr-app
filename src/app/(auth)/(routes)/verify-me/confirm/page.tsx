'use client';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import Image from 'next/image';
import { useState } from 'react';

const ConfirmAccountIdentityPage = ({ email }: { email: string }) => {
  const [otp, setOtp] = useState('');
  return (
    <div className="flex h-screen items-center justify-center relative">
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
      <div className="space-y-6 flex flex-col items-start max-w-[481px] w-full mx-auto">
        <div
          className="flex items-center justify-center
       w-16 h-16 bg-primary-50 rounded-full text-center"
        >
          <Image
            src="/icons/sms-tracking.svg"
            alt="icon"
            width={32}
            height={32}
          />
        </div>
        <div className="w-full">
          <div className="space-y-4 max-w-[481px] mb-6">
            <h3 className="text-[32px] font-bold text-neutral-900">
              Verify your email address
            </h3>
            <p className="text-neutral-500 text-base">
              We just sent you a verification email link or code to you on
              <br />
              <span className="text-primary-500">{email}</span>
            </p>
          </div>
          <div className="w-full flex justify-center">
            <InputOTP
              maxLength={5}
              className="gap-x-4 "
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPSlot
                index={0}
                className="text-xl font-satoshi font-medium text-neutral-900 !rounded-none border-t-0 !border-l-0 !border-r-0 !border-b-[2px] w-12 h-12"
              />
              <InputOTPSlot
                index={1}
                className="text-xl font-satoshi font-medium text-neutral-900 !rounded-none border-t-0 !border-l-0 !border-r-0 !border-b-[2px] w-12 h-12"
              />
              <InputOTPSlot
                index={2}
                className="text-xl font-satoshi font-medium text-neutral-900 !rounded-none border-t-0 !border-l-0 !border-r-0 !border-b-[2px] w-12 h-12"
              />
              <InputOTPSlot
                index={3}
                className="text-xl font-satoshi font-medium text-neutral-900 !rounded-none border-t-0 !border-l-0 !border-r-0 !border-b-[2px] w-12 h-12"
              />
              <InputOTPSlot
                index={4}
                className="text-xl font-satoshi font-medium text-neutral-900 !rounded-none border-t-0 !border-l-0 !border-r-0 !border-b-[2px] w-12 h-12"
              />
            </InputOTP>
          </div>
          <div className="flex flex-col items-center justify-between gap-y-6 w-full !mt-12">
            <Button
              className="w-full h-[64px]  flex items-center rounded-[10px]
           justify-center font-body bg-neutral-800 text-white font-bold text-lg"
            >
              Verify
            </Button>
            <p className="flex items-center text-neutral-500 text-base gap-x-2">
              I didn't get any code?
              <Button
                className="font-bold text-base text-primary-500 p-0 flex-1 h-fit"
                variant="link"
              >
                Resend again
              </Button>
            </p>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default ConfirmAccountIdentityPage;
