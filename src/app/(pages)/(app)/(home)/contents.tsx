'use client';

import React from 'react';
import { ContentFilters } from '../__components/content-filters';
import { Container } from '@/components/container';
import { Author, ContentResource } from '@/lib/schema/data';
import { ContentCard } from '@/components/content-card';

type Props = {};

const author: Author = {
  fullName: 'Austin Smiths',
  email: 'austin.smiths@gmail.com',
  avatarUrl: '/',
};

const content: ContentResource = {
  title: 'The History of Numbers and Counting Systems',
  href: 'https://www.web.com/come',
  bannerImgUrl: '/imgs/category-3.png',
  bookmarked: false,
};

const items = [
  [content, author],
  [content, author],
  [content, author],
  [content, author],
  [content, author],
  [content, author],
  [content, author],
] as Array<[ContentResource, Author]>;

export const Contents = (props: Props) => {
  return (
    <div className="w-full pb-[144px]">
      <Container>
        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-[40px] leading-[54px] text-black font-josefin font-semibold">
              Popular Topic by Creators
            </h3>
            <p className="text-base text-neutral-500">
              Find most trending topics by top creators
            </p>
          </div>

          <ContentFilters />

          <div
            className="grid gap-8 w-full"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(379px, 1fr))',
            }}
          >
            {items.map((item) => (
              <ContentCard data={item[0]} author={item[1]} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
