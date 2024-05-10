import { CourseItem } from '@/lib/validations/course';
import { Card, CardFooter, CardHeader } from './ui/card';
import Image from 'next/image';
import { format } from 'date-fns';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

type CourseCardProps = { item: CourseItem };

export const CourseCard = ({
  item: {
    title,
    bannerImgUrl,
    bookmarked,
    authorName,
    createdAt,
    lastModifiedAt,
    releasedVersions: version,
  },
}: CourseCardProps) => {
  return (
    <Card className="p-0 min-w-[379px] w-full shadow-none rounded-[8px] overflow-hidden border-none">
      <CardHeader className="p-0">
        <div className="relative h-[200px] overflow-hidden">
          <Image
            src={bannerImgUrl}
            fill
            alt="banner"
            className="object-cover object-center block"
          />
        </div>
      </CardHeader>

      <div className="p-6 w-full border border-neutral-200 border-t-0 rounded-bl-[8px] rounded-br-[8px]">
        <div className="space-y-3">
          <h4 className="font-medium text-black text-lg">{title}</h4>
          <div className="flex items-center gap-x-2">
            <p className="text-neutral-400 text-sm font-medium">
              <span className="font-bold">Edited:</span>{' '}
              {format(lastModifiedAt, 'dd MMM yyyy')}
            </p>
            <p className="text-neutral-400 text-sm font-medium">
              <span className="font-bold">Uploaded:</span>{' '}
              {format(createdAt, 'dd MMM yyyy')}
            </p>
          </div>
        </div>
        <Separator className="my-5" />
        <CardFooter className="p-0">
          <div className="w-full flex items-center">
            <p className="text-neutral-400 text-sm font-medium">
              By{' '}
              <span className="font-bold text-primary-500">
                {authorName.trim()}
              </span>
              {` | ${version} version${version > 1 ? 's' : ''}`}
            </p>
            <Button className="" variant="ghost"></Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};
