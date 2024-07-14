'use client';

import { cn } from '@/lib/utils';
import { useSignUpContext } from './provider';
import React from 'react';
import { Separator } from '@/components/ui/separator';

export const StageProgressBar = () => {
  const { stage, stageMeta } = useSignUpContext();
  if (!(stageMeta && stage && stage !== 'verify-account')) return null;

  return (
    <div className="flex items-center gap-x-2">
      {Object.values(stageMeta).map(({ index }, pos) => (
        <React.Fragment key={index}>
          {pos !== 0 && (
            <div className="flex-1">
              <Separator
                className={cn(
                  'w-full h-[3px] bg-neutral-200',
                  stageMeta[stage]?.index >= index && 'bg-primary-500'
                )}
              />
            </div>
          )}

          <div
            className={cn(
              'w-10 h-10 rounded-full bg-neutral-200 text-lg text-white flex items-center justify-center',
              stageMeta[stage]?.index >= index && 'bg-primary-500'
            )}
          >
            {index}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
