"use client";
import { Container } from "@/components/container";
import React, { useMemo } from "react";
import { ContentCatgoryCard } from "./category-card";
import { ContentCategory } from "@/lib/response";

type Props = {
  categories: Array<ContentCategory>;
};

const partialContentCategoryData: Record<string, Partial<ContentCategory>> = {
  Primary: { bannerUrl: "/imgs/category-1.png", colour: "#FA5A5A" },
  Secondary: { bannerUrl: "/imgs/category-2.png", colour: "#28BCEC" },
  Tertiary: { bannerUrl: "/imgs/category-3.png", colour: "#4EAC86" },
};

export const ChooseCategory = ({ categories }: Props) => {
  categories = useMemo<Array<ContentCategory>>(
    () =>
      Object.entries(partialContentCategoryData).map(
        ([key, value]) =>
          ({
            ...categories.find(
              (c) => c.name.toLowerCase() === key.toLowerCase(),
            ),
            ...value,
          }) as ContentCategory,
      ),
    [categories],
  );

  console.log({ categories });

  return (
    <div className="w-full bg-white pt-[96px] pb-[148px]">
      <Container>
        <div className="space-y-[48px]">
          <h3 className="text-[40px] font-semibold text-black font-josefin">
            Choose your categories
          </h3>
          <div
            className="flex items-center gap-8 flex-wrap
          [&>*]:min-w-fit [&>*]:flex-1"
          >
            {categories.map((category, i) => (
              <ContentCatgoryCard {...category} key={i} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
