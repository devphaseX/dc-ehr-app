'use client';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { DiscoverTab } from '../../_components/discover-tab';
import { courseSamples } from '@/lib/fake/courses';
import { CourseCard } from '@/components/course-card';
import { categoryTabMap } from '../../_components/constants/discover-category';

export default function DiscoverBooks() {
  const [selectedCategory, setSelectCategory] = useState<'_' | string>('_');
  return (
    <section className="w-full pt-24 pb-[175px]">
      <Container>
        <div>
          <div className="space-y-12 mb-24">
            <h3 className="text-black font-bold text-5xl">Popular topics</h3>
            <div>
              <DiscoverTab
                selectedCategory={selectedCategory}
                setSelectCategory={setSelectCategory}
                categoryTabMap={categoryTabMap}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {courseSamples.map((course) => (
              <CourseCard item={course} key={course.id} />
            ))}
          </div>

          <div className="flex w-full justify-center mt-12">
            <Button
              className="px-8 py-4 rounded-[8px] text-white 
            font-bold text-base w-fit h-fit bg-primary-500"
            >
              Show all resources
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
