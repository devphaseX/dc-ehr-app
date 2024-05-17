import { AuthorCard } from '@/components/author-card';
import { Separator } from '@/components/ui/separator';
import { getPrimaryCourse } from '@/lib/fake/courses';
import { ActionButtons } from './_components/action-buttons';

const ResourceContentPage = async () => {
  const course = await getPrimaryCourse();
  return (
    <>
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
            <p className="text-neutral-400 font-medium text-sm">
              {course.auditor.id === course.ownerId
                ? 'Original creator'
                : 'Moderator'}
            </p>
            <Separator className="text-neutral-100 w-[2px] h-4" />
            <p className="text-neutral-400 font-medium text-sm">{`${
              course.releasedVersions
            } version${course.releasedVersions > 1 ? 's' : ''}`}</p>
          </div>

          <div className="flex gap-x-2 items-center">
            {Array.from(new Set(course.tags ?? []), (tag) => (
              <div
                key={tag.replace(/\s+/g, '-')}
                className="inline-flex px-3 py-2 rounded-[32px]
                       border border-neutral-100 text-sm font-bold text-primary-500"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <ActionButtons />
      </div>

      <p className="text-neutral-500 text-base mt-8">{course.description}</p>
    </>
  );
};

export default ResourceContentPage;
