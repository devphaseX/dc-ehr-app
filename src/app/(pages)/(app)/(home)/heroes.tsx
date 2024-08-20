import React from "react";
import { HeroSearchInput } from "./__components/hero-search-input";
import { serverGetCategories } from "@/features/query/get-categories";
import { ContentCategory } from "@/lib/response";

type Props = {};

export const Heroes = async (props: Props) => {
  const { data } = await serverGetCategories();
  return (
    <div className="min-h-[660px] bg-primary-500">
      <div className="h-full pt-[140px]">
        <div className="flex justify-center w-full">
          <div className="max-w-[790px] w-full space-y-[48px]">
            <div className="max-w-[666px] w-full mx-auto space-y-6">
              <h1 className="text-white font-semibold text-[64px] text-center">
                The Best Online Resoruce Library Hub
              </h1>
              <p className="text-2xl text-white text-center">
                Acquire and download reilable resource that have been provided
                by top creators
              </p>
            </div>
            <HeroSearchInput
              categories={(data?.responseData || []) as Array<ContentCategory>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
