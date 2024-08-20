import { Container } from "@/components/container";
import React, { useMemo } from "react";
import { ContentCatgoryCard } from "./category-card";
import { ContentCategory } from "@/lib/response";

type Props = {
  categories: Array<ContentCategory>;
};

const remainingData: Record<string, Partial<ContentCategory>> = {
  Primary: { bannerUrl: "/imgs/category-1.png", colour: "#FA5A5A" },
  Secondary: { bannerUrl: "/imgs/category-2.png", colour: "#28BCEC" },
  Tertiary: { bannerUrl: "/imgs/category-3.png", colour: "#4EAC86" },
};

// [
//     {
//       "name": "Secondary",
//       "description": "This is the category for Secondary Institutions",
//       "id": "25976e98-971b-4fe4-8330-1621e29c89c2",
//       "createdDate": "2024-08-12T13:28:21.05",
//       "dateModified": "2024-08-12T13:28:21.05",
//       "isDeleted": false
//     },
//     {
//       "name": "Tertiary",
//       "description": "This is the category for Tertiary Institutions",
//       "id": "88e49dd7-70dc-4ee4-b20f-4ef6d3a743b4",
//       "createdDate": "2024-08-12T13:28:21.05",
//       "dateModified": "2024-08-12T13:28:21.05",
//       "isDeleted": false
//     },
//     {
//       "name": "Primary",
//       "description": "This is the category for Primary Institutions",
//       "id": "a438e595-0616-4304-a863-ed735e99ea53",
//       "createdDate": "2024-08-12T13:28:21.05",
//       "dateModified": "2024-08-12T13:28:21.05",
//       "isDeleted": false
//     }
// const categories: Array<ContentCategory> = [
//   {
//     title: 'Elementary Hub',
//     bannerUrl: '/imgs/category-1.png',
//     grade: 'K - 5',
//     colour: '#FA5A5A',
//     url: '/',
//   },
//   {
//     title: 'Primary Hub',
//     bannerUrl: '/imgs/category-2.png',
//     grade: 'K - 5',
//     colour: '#28BCEC',
//     url: '/',
//   },
//   {
//     title: 'Tertiary Hub',
//     bannerUrl: '/imgs/category-3.png',
//     grade: '12+',
//     colour: '#4EAC86',
//     url: '/',
//   },
// ];

export const ChooseCategory = ({ categories }: Props) => {
  console.log({ categories });
  const [data] = useMemo(
    () =>
      Object.entries(remainingData).map(
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
  console.log(data);

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
