"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

type SearchInputProps = {
  initialSearch?: string;
  onSearch?: (value: string) => void;
};

export const SearchInput = ({ initialSearch, onSearch }: SearchInputProps) => {
  const [search, setSearch] = useState(initialSearch ?? "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // Debounce delay (in milliseconds)

    return () => {
      clearTimeout(handler); // Clear timeout if the user types again before the timeout completes
    };
  }, [search]);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearch); // Call the onSearch function when the debounced value changes
    }
  }, [debouncedSearch, onSearch]);

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
