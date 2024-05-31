import { AuthorCard } from '@/components/author-card';
import { Separator } from '@/components/ui/separator';
import { getPrimaryCourse } from '@/lib/fake/courses';
import { ActionButtons } from './_components/action-buttons';
import { Button } from '@/components/ui/button';

const ResourceContentPage = async () => {
  const course = await getPrimaryCourse();
  return (
    <div>
      <div>
        <div className="space-y-4">
          <h5 className="text-4xl text-black font-bold max-w-[680px]">
            {course.title}
          </h5>

          <div className="flex items-center gap-x-2">
            <p className="text-sm font-bold text-neutral-400">
              by{' '}
              <span className="text-primary-500">
                {course.auditor.fullName}
              </span>
            </p>

            <Separator className="text-neutral-100 w-[2px] h-4" />
            <p className="text-neutral-400 font-medium text-sm">{`${
              course.releasedVersions
            } version${course.releasedVersions > 1 ? 's' : ''}`}</p>
          </div>

          <Button
            variant="link"
            className="font-bold text-primary-500 border-b-[2px]
             border-primary-500 rounded-none p-0  h-fit w-fit !no-underline !underline-offset-0"
          >
            See more info
          </Button>
        </div>
      </div>
      <div className="flex gap-x-2 items-center mt-6">
        {Array.from(new Set(course.tags ?? []), (tag) => (
          <div
            key={tag.replace(/\s+/g, '-')}
            className="inline-flex px-3 py-2 rounded-[32px]
                        bg-neutral-50 text-sm font-bold text-neutral-600"
          >
            {tag}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <ActionButtons />
      </div>

      <div className="space-y-2 mt-8">
        <h6 className="text-base font-bold text-black">Abstract</h6>
        <p className="text-neutral-500 text-base mt-8">{course.description}</p>
      </div>
    </div>
  );
};

export default ResourceContentPage;
