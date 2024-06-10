'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

type SearchInputProps = {
  mapToUrlWith: string;
  onSearch?: (value: string) => void;
};

export const SearchInput = ({ mapToUrlWith }: SearchInputProps) => {
  const [search, setSearch] = useQueryState(
    mapToUrlWith,
    parseAsString.withOptions({ throttleMs: 500 }).withDefault('')
  );

  return (
    <div className="relative min-w-[320px] h-full">
      <Search className="size-6 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
      <Input
        value={search}
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        className="border-none bg-neutral-50 py-3 px-5 rounded-[48px] 
         w-full h-full placeholder:text-neutral-400 
         font-josefin text-neutral-900 text-base pl-14"
      />
    </div>
  );
};
