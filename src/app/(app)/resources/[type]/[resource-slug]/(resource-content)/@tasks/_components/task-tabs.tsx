'use client';
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQueryState } from 'nuqs';
import { cn } from '@/lib/utils';

type Props = {
  urlSync?: string;
  tabs: Array<{ label: string; tag: string }>;
};

export const TaskTabs = ({ urlSync, tabs }: Props) => {
  const [currentTag, setTag] = useQueryState(urlSync ?? '', {
    throttleMs: 200,
    defaultValue: tabs.at(0)?.tag ?? '',
    shallow: true,
  });
  return (
    <Tabs value={currentTag ?? ''} onValueChange={setTag}>
      <div className="pb-6 border-b-[2px] border-neutral-100 w-full">
        <TabsList className="bg-transparent p-0 h-fit">
          {tabs.map(({ label, tag }) => (
            <TabsTrigger
              key={tag}
              value={tag}
              className={cn(
                'group text-neutral-400 text-base  !ring-offset-0 !ring-transparent !py-0 rounded-none !shadow-none font-medium relative h-fit w-fit flex items-center gap-x-2 px-4',
                tag === currentTag && '!text-primary-500 font-bold',
                'hover:text-primary-500 font-bold'
              )}
            >
              {label}
              <div
                className={cn(
                  ' absolute inset-x-0 h-[3px] bg-primary-500 -bottom-[1.55rem] invisible transition-all delay-100',
                  tag === currentTag && 'visible',
                  'group-hover:visible'
                )}
              ></div>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
};
