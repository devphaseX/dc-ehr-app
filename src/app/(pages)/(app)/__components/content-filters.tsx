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
import { ChevronDown } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";

export const ContentFilters = ({
  categories,
}: {
  categories: Array<ContentCategory>;
}) => {
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withOptions({ throttleMs: 500 }),
  );

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
        </div>

        <div>
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
          <Skeleton className="w-32 h-12 rounded-[80px]" />
        </div>
      </div>
    </div>
  );
}
