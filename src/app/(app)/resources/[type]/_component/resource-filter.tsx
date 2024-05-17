'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useQueryState } from 'nuqs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { DiscoverTab } from '@/app/(app)/_components/discover-tab';
import { categoryTabMap } from '@/app/(app)/_components/constants/discover-category';

export const ResourceFilters = () => {
  const [selectedCategory, setSelectCategory] = useState<'_' | string>('_');

  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  const [search, setSearch] = useQueryState('q', {
    throttleMs: 300,
    defaultValue: '',
  });
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-x-4">
          <DropdownMenu
            open={categoriesMenuOpen}
            onOpenChange={setCategoriesMenuOpen}
          >
            <DropdownMenuTrigger
              asChild
              className="rounded-[56px] border-neutral-200 py-4 px-6
               font-medium text-base h-fit w-fit flex gap-x-4 items-center"
            >
              <Button variant="outline">
                All Categories {<ChevronDown className="size-5" />}
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
          <DropdownMenu
            open={categoriesMenuOpen}
            onOpenChange={setCategoriesMenuOpen}
          >
            <DropdownMenuTrigger
              asChild
              className="rounded-[56px] border-neutral-200 py-4 px-6
               font-medium text-base h-fit w-fit flex gap-x-4 items-center"
            >
              <Button variant="outline">
                All topic{<ChevronDown className="size-5" />}
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
          <DropdownMenu
            open={categoriesMenuOpen}
            onOpenChange={setCategoriesMenuOpen}
          >
            <DropdownMenuTrigger
              asChild
              className="rounded-[56px] border-neutral-200 py-4 px-6
               font-medium text-base h-fit w-fit flex gap-x-4 items-center"
            >
              <Button variant="outline">
                Newest {<ChevronDown className="size-5" />}
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>

        <div className="max-w-[464px] w-full relative flex h-[56px]">
          <Image
            src="/icons/search-normal.svg"
            alt="icon"
            width={24}
            height={24}
            className="absolute left-12  top-1/2 -translate-x-[100%] -translate-y-1/2 "
          />
          <Input
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            placeholder="Search resources"
            className="pl-16 pr-4 py-4 h-full w-full shadow-none 
            placeholder:text-neutral-400  placeholder:text-base 
            !ring-offset-0 !ring-transparent rounded-none rounded-tl-[56px] rounded-bl-[56px] text-neutral-700"
          />
          <Button
            className="w-[100px] shadow-none h-auto self-stretch
             bg-primary-500 font-bold text-white flex items-center
           justify-center rounded-none rounded-tr-[56px] rounded-br-[56px] !ring-offset-0 !ring-transparent !outline-none
            capitalize text-base px-6 py-4"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <DiscoverTab
          selectedCategory={selectedCategory}
          setSelectCategory={setSelectCategory}
          categoryTabMap={categoryTabMap}
        />
      </div>
    </div>
  );
};
