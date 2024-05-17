import { CourseItem } from '@/lib/validations/course';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';

type BookCardProps = {
  book: CourseItem;
};

export const BookCard = ({
  book: { authorName, title, bannerImgUrl, lastModifiedAt, createdAt },
}: BookCardProps) => {
  return (
    <Card className="w-full p-6 shadow-none space-y-6">
      <CardHeader className="flex flex-row items-center p-0 gap-x-6 space-y-0">
        <Avatar className="size-[120px] rounded-[8px]">
          <AvatarImage src={bannerImgUrl} alt="banner" />
          <AvatarFallback></AvatarFallback>
        </Avatar>

        <div className="flex-1 flex justify-between items-end">
          <div className="space-y-4">
            <CardTitle className="font-medium text-lg text-black">
              {title}
            </CardTitle>

            <p className="text-sm text-neutral-400 font-medium">
              By{' '}
              <span className="text-primary-500 font-bold">{authorName}</span>
            </p>
          </div>
          <Button variant="ghost" className="p-0">
            <Bookmark />
          </Button>
        </div>
      </CardHeader>
      <Separator className="bg-neutral-100 w-full" />
      <CardFooter className="p-0">
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
      </CardFooter>
    </Card>
  );
};
