"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { parseAsStringEnum, useQueryState } from "nuqs";
import { useState } from "react";

export type TabItem = {
  label: string;
  tab: string;
  tagCount?: number;
  disabled?: boolean;
};

export const ResourceActionTab = () => {
  const [selectedTab, setSelectedTab] = useQueryState(
    "tab",
    parseAsStringEnum(["resources", "descriptions"]).withDefault(
      "descriptions",
    ),
  );

  const items: Array<TabItem> = [
    {
      label: "Descriptions",
      tab: "descriptions",
    },

    {
      label: "Resources",
      tab: "resources",
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
              <div className="flex items-center gap-x-1">{item.label}</div>
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>
      <Separator className="h-[2px] bg-[rgba(146,158,171,8%)] rounded-e-xl -translate-y-[1px]" />
    </Tabs>
  );
};
