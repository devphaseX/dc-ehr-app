'use client';

import { useEffect, useState } from 'react';
import { Stage, useSignUpContext } from '../provider';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const CompleteAccountPage = () => {
  const { accountCreated, stage, setStage } = useSignUpContext();
  const [showPage, setShowPage] = useState(false);
  const router = useRouter();

  if (!showPage) return null;

  return (
    <div className="w-full h-full absolute inset-0">
      <div className="h-full w-full flex items-center justify-center">
        <div className="max-w-[580px] w-full text-center">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-neutral-800">
              Account created successfully
            </h3>

            <p className="text-lg text-neutral-500">
              Welcome James, You can now share and download alot of free
              resources from your resources page
            </p>
          </div>
          <Button
            type="button"
            onClick={() => router.push('/sign-in')}
            className="w-full h-fit p-4 text-base text-white font-semibold 
        rounded-[56px] bg-primary-500 !mt-10"
          >
            Return to sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompleteAccountPage;
