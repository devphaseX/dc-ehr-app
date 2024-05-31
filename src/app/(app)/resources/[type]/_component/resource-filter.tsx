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
      <div className="flex items-center [&>*]:flex-1 gap-x-6">
        <DropdownMenu
          open={categoriesMenuOpen}
          onOpenChange={setCategoriesMenuOpen}
        >
          <DropdownMenuTrigger
            asChild
            className="rounded-[56px] border-none bg-neutral-50 py-4 px-6
               font-medium text-base h-fit w-fit flex gap-x-4 items-center justify-between"
          >
            <Button variant="outline">
              All level{<ChevronDown className="size-5" />}
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>

        <DropdownMenu
          open={categoriesMenuOpen}
          onOpenChange={setCategoriesMenuOpen}
        >
          <DropdownMenuTrigger
            asChild
            className="rounded-[56px] border-none bg-neutral-50 py-4 px-6
               font-medium text-base h-fit w-fit flex gap-x-4 items-center justify-between"
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
            className="rounded-[56px] border-none bg-neutral-50 py-4 px-6
               font-medium text-base h-fit w-fit flex gap-x-4 items-center justify-between"
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
            className="rounded-[56px] border-none bg-neutral-50 py-4 px-6
               font-medium text-base h-fit w-fit flex gap-x-4 items-center justify-between"
          >
            <Button variant="outline">
              Newest {<ChevronDown className="size-5" />}
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
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
