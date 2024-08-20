"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ContentCategory } from "@/lib/response";
import { ChevronDown } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import React from "react";
type Props = {
  categories: Array<ContentCategory>;
};

export const HeroSearchInput = ({ categories }: Props) => {
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withOptions({ throttleMs: 500 }),
  );

  const [search, setSearch] = useQueryState(
    "q",
    parseAsString.withOptions({ throttleMs: 500 }).withDefault(""),
  );

  return (
    <div className="w-full">
      <div className="flex items-center gap-x-4 w-full relative bg-white p-[10px] rounded-[80px]">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="!bg-neutral-50 w-fit
            h-fit px-6 py-4 rounded-[56px]  flex items-center gap-x-4
            text-sm font-medium text-neutral-700"
            >
              {category ?? "All category"}
              <ChevronDown className="size-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align={"start"}>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>

        <div className="flex-1 self-stretch relative">
          <Input
            className="absolute inset-0 h-full border-none text-lg
             text-neutral-700 placeholder:text-neutral-400 p-0 !ring-0 !ring-transparent "
            placeholder="Search resources by name, topics, creator"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          className="!bg-black w-fit
            h-fit px-8 py-4 rounded-[56px]
            text-base font-medium text-white"
        >
          Search
        </Button>
      </div>
    </div>
  );
};
