import { SharedContentCard } from '@/components/shared-content-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sharedContentSamples } from '@/lib/fake/shared-content';
import React from 'react';

type Props = {};

const SharedResources = async (props: Props) => {
  const rs = sharedContentSamples;
  return (
    <div className="w-full space-y-8">
      <h4 className="uppercase text-xs font-bold text-neutral-800 ">
        Shared Resources{' '}
        <span className="text-neutral-300"> ({rs.length})</span>
      </h4>

      <div className="h-[557px]">
        <ScrollArea className="h-full pr-3">
          <div className="space-y-8">
            {rs.map((r) => (
              <SharedContentCard content={r} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SharedResources;
