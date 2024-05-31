'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useQueryState } from 'nuqs';

export const Search = () => {
  const [search, setSearch] = useQueryState('q', { throttleMs: 500 });
  return (
    <div className="p-1 bg-white max-w-[456px] w-full rounded-[56px] overflow-hidden isolate">
      <div className="relative overflow-hidden flex">
        <Input
          className="w-full h-full border-none !ring-0 py-4 px-6 bg-transparent placeholder:text-neutral-400 text-base"
          placeholder="Search..."
        />
        <Button
          className="absolute w-16 h-full inset-y-0 rounded-[48px]
         bg-primary-500 right-0 z-10 top-0 "
        >
          <span>
            <Image
              src="/icons/search-normal.svg"
              alt="icon"
              width={20}
              height={20}
            />
          </span>
        </Button>
      </div>
    </div>
  );
};
