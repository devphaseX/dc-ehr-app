import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ResourcePaginate = () => {
  return (
    <Pagination>
      <PaginationContent className="gap-x-6">
        <PaginationItem>
          <PaginationLink>
            <Button
              variant="outline"
              className="p-3 w-11 h-11 rounded-[4px] border-neutral-200"
            >
              <ChevronLeft className="size-5" />
            </Button>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className={cn(
              'p-3 w-11 h-11 text-neutral-300 text-base border-neutral-200 !ring-offset-0 !ring-transparent',
              'aria-[current=page]:border-primary-500 aria-current-page:text-primary-500 aria-current-page:bg-primary-50 aria-current-page:border-[2px]'
            )}
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className={cn(
              'p-3 w-11 h-11 text-neutral-300 text-base border-neutral-200 !ring-offset-0 !ring-transparent',
              'aria-[current=page]:border-primary-500 aria-current-page:text-primary-500 aria-current-page:bg-primary-50 aria-current-page:border-[2px]'
            )}
            isActive
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className={cn(
              'p-3 w-11 h-11 text-neutral-300 text-base border-neutral-200 !ring-offset-0 !ring-transparent',
              'aria-[current=page]:border-primary-500 aria-current-page:text-primary-500 aria-current-page:bg-primary-50 aria-current-page:border-[2px]'
            )}
          >
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className={cn(
              'p-3 w-11 h-11 text-neutral-300 text-base border-neutral-200 !ring-offset-0 !ring-transparent',
              'aria-[current=page]:border-primary-500 aria-current-page:text-primary-500 aria-current-page:bg-primary-50 aria-current-page:border-[1.5px]'
            )}
          >
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>
            <Button
              variant="outline"
              className="p-3 w-11 h-11 rounded-[4px] bg-neutral-900"
            >
              <ChevronRight className="size-4 text-white" />
            </Button>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
