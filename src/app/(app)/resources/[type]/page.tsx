import { Container } from '@/components/container';
import { CourseCard } from '@/components/course-card';
import { courseSamples } from '@/lib/fake/courses';
import { ResourcePaginate } from './_component/resource-paginate';
import { Footer } from '../../_components/footer';

export default function ResourceTypePage({
  params,
}: {
  params: { slots: Array<string> };
}) {
  return (
    <>
      <div className="w-full pt-16 pb-[112px]">
        <Container className="max-w-[1200px]">
          <div className="space-y-16">
            <div className="grid grid-cols-3 gap-8">
              {courseSamples.map((course) => (
                <CourseCard item={course} key={course.id} />
              ))}
            </div>
            <div className="flex justify-center w-full">
              <ResourcePaginate />
            </div>
          </div>
        </Container>
      </div>
      <Footer copyRightYear={2024} />
    </>
  );
}
