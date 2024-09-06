"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { parseAsStringEnum, useQueryState } from "nuqs";

export type TabItem = {
  label: string;
  tab: string;
  tagCount?: number;
  disabled?: boolean;
};

export const ProfileActionTab = () => {
  const [selectedTab, setSelectedTab] = useQueryState(
    "tab",
    parseAsStringEnum([
      "publications",
      "repost",
      "favourite",
      "deleted",
      "setting",
    ]).withDefault("publications"),
  );

  const items: Array<TabItem> = [
    {
      label: "Publications",
      tab: "publications",
      tagCount: 9,
    },

    {
      label: "Repost",
      tab: "repost",
      tagCount: 20,
    },
    {
      label: "Favourite",
      tab: "favourite",
      tagCount: 20,
    },
    {
      label: "Deleted",
      tab: "deleted",
      tagCount: 20,
    },
  ];

  return (
    <Tabs
      className="w-full mb-6"
      value={selectedTab}
      onValueChange={(tab) => {
        setSelectedTab(tab as typeof selectedTab);
      }}
    >
      <TabsList className="bg-transparent p-0 h-fit">
        {items.map((item) => (
          <TabsTrigger
            value={item.tab}
            asChild
            key={item.tab}
            disabled={item.disabled}
          >
            <Button
              className={cn(
                `!text-neutral-500 pb-6  border-b-[3px]  px-6
                border-transparent rounded-none font-inter text-base font-medium
                !bg-transparent data-[state=active]:bg-transparent shadow-none
                ring-offset-0 data-[state=active]:shadow-none h-fit`,
                item.tab === selectedTab &&
                  "border-primary-500 !text-primary-500 font-bold",
              )}
            >
              <div className="flex items-center gap-x-1">
                {item.label}
                <span
                  className="bg-neutral-50 size-6 rounded-full flex items-center
                justify-center text-xs text-semibold text-neutral-500"
                >
                  {item.tagCount || 0}
                </span>
              </div>
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>
      <Separator className="h-[2px] bg-[rgba(146,158,171,8%)] rounded-e-xl -translate-y-[1px]" />
    </Tabs>
  );
};
