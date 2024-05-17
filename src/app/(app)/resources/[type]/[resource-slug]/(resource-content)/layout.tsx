import React from 'react';
import { AuthorCard } from '@/components/author-card';
import { Container } from '@/components/container';
import { getPrimaryCourse } from '@/lib/fake/courses';
import Image from 'next/image';
import { SearchTermsCard } from './_components/search-terms-card';

const ResourceSlugLayout = async ({
  children,
  tasks,
}: {
  tasks: React.ReactNode;
  children: React.ReactNode;
}) => {
  const course = await getPrimaryCourse();
  return (
    <div className="w-full pb-28">
      <Container className="max-w-[1200px]">
        <div className="grid lg:grid-cols-3 pt-6 gap-x-[38px]">
          <div className="lg:col-span-2  space-y-8">
            <div className="h-[360px] w-full relative rounded-[16px] overflow-hidden">
              <Image
                src={course.bannerImgUrl}
                alt="banner"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="space-y-12">
              {children}
              {tasks}
            </div>
          </div>
          <div className="col-start-3 col-end-[-1] row-span-full space-y-6">
            <AuthorCard
              author={course.auditor}
              courseAuthorId={course.ownerId}
            />
            <SearchTermsCard
              terms={[
                'Technology',
                'Secondary',
                'Machine Learning',
                'Computer science',
              ]}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ResourceSlugLayout;
