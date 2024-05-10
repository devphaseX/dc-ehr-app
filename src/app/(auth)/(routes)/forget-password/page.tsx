'use client';
import Image from 'next/image';
import { Banner } from '../../_components/banner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Label } from '@/components/ui/label';

export default function ForgetPasswordPage() {
  const [recoverAccountEmail, setRecoverAccountEmail] = useState('');
  return (
    <div className="h-screen w-full">
      <div className="p-8 w-full h-full">
        <div className="max-w-[1440px] w-full mx-auto h-full">
          <div className="h-full flex w-full gap-x-[135px] items-center">
            <div className="flex-1 h-full">
              <Banner bannerImgUrl="" />
            </div>
            <div className="flex-1 h-full flex items-center relative">
              <div className="space-y-6 w-[481px]">
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
                    <h3 className="text-[32px] font-bold text-neutral-900">
                      Reset password
                    </h3>
                    <p className="font-medium text-neutral-500 text-base text-left">
                      Enter your email address you use to register for your
                      account, To reset your password pa**********gmail.com
                    </p>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <Label className="font-bold text-neutral-800 text-base">
                        Email address
                      </Label>
                      <Input
                        value={recoverAccountEmail}
                        className="w-full h-[56px] bg-neutral-50 border-none rounded-[8px] 
                        px-6 py-4 placeholder:text-neutral-300 text-base text-neutral-900"
                        onChange={(e) => setRecoverAccountEmail(e.target.value)}
                        placeholder="felixwestley@gmail.com"
                      />
                    </div>

                    <Button
                      className="w-full font-bold text-lg py-4 text-white h-fit bg-neutral-800"
                      variant="link"
                    >
                      Send reset email link
                    </Button>
                  </div>
                </div>

                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
