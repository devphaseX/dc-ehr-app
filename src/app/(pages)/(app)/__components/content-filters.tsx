"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategories } from "@/features/api/query/use-get-categories";
import { ContentCategory } from "@/lib/response";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

export const ContentFilters = ({
  categories,
}: {
  categories: Array<ContentCategory>;
}) => {
  const [selectedCategory, setCategory] = useQueryState(
    "category",
    parseAsString.withOptions({ throttleMs: 300, shallow: false }),
  );

  const [categoryBtnWidth, setCategoryBtnWidth] = useState(0);
  const { data } = useGetCategories();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="!bg-neutral-50 w-fit
              h-fit px-6 py-4 rounded-[56px]  flex items-center gap-x-4
              text-sm font-medium text-neutral-700"
                ref={(el) => {
                  if (el) {
                    setCategoryBtnWidth(el.getBoundingClientRect().width);
                  } else {
                    setCategoryBtnWidth(0);
                  }
                }}
              >
                {selectedCategory || "All category"}
                <ChevronDown className="size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align={"start"}
              className="p-2 w-fit"
              style={{
                minWidth: `${categoryBtnWidth}px`,
              }}
            >
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => setCategory(category.name)}
                    className="cursor-pointer hover:bg-neutral-50 px-2 flex justify-between items-center"
                  >
                    {category.name}{" "}
                    <Check
                      className={cn(
                        "size-4 invisible",
                        category?.name === selectedCategory && "visible",
                      )}
                    />
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          {/*
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="py-4 px-6 w-fit h-fit !bg-neutral-50
             rounded-[80px] text-neutral-500 font-medium text-base
              flex items-center gap-x-[44px]"
              >
                Filter by
                <ChevronDown className="size-5" />
              </Button>
            </PopoverTrigger>
          </Popover>
          */}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export function ContentFiltersSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-live="polite">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Skeleton className="w-40 h-12 rounded-[56px]" />
        </div>

        <div>
          {/*
          <Skeleton className="w-32 h-12 rounded-[80px]" />
          */}
        </div>
      </div>
    </div>
  );
}
