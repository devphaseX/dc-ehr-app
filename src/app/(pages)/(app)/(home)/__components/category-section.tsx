import { Container } from '@/components/container';
import { ContentCategory } from '@/types';
import React from 'react';
import { ContentCatgoryCard } from './category-card';

type Props = {};

const categories: Array<ContentCategory> = [
  {
    title: 'Elementary Hub',
    bannerUrl: '/imgs/category-1.png',
    grade: 'K - 5',
    colour: '#FA5A5A',
    url: '/',
  },
  {
    title: 'Primary Hub',
    bannerUrl: '/imgs/category-2.png',
    grade: 'K - 5',
    colour: '#28BCEC',
    url: '/',
  },
  {
    title: 'Tertiary Hub',
    bannerUrl: '/imgs/category-3.png',
    grade: '12+',
    colour: '#4EAC86',
    url: '/',
  },
];

export const ChooseCategory = (props: Props) => {
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
