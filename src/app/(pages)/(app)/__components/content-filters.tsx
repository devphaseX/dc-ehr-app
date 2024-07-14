import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';

export const ContentFilters = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="py-4 px-6 w-fit h-fit !bg-neutral-50
           rounded-[80px] text-neutral-500 font-medium text-base 
           flex items-center gap-x-[44px]"
              >
                All Categories
                <ChevronDown className="size-5" />
              </Button>
            </PopoverTrigger>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="py-4 px-6 w-fit h-fit !bg-neutral-50
           rounded-[80px] text-neutral-500 font-medium text-base
            flex items-center gap-x-[44px]"
              >
                All Format
                <ChevronDown className="size-5" />
              </Button>
            </PopoverTrigger>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="py-4 px-6 w-fit h-fit !bg-neutral-50
             rounded-[80px] text-neutral-500 font-medium 
             text-base flex items-center gap-x-[44px]"
              >
                Newest date
                <ChevronDown className="size-5" />
              </Button>
            </PopoverTrigger>
          </Popover>
        </div>

        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="py-4 px-6 w-fit h-fit !bg-neutral-50
             rounded-[80px] text-neutral-500 font-medium text-base
              flex items-center gap-x-[44px]"
              >
                Filter by
                <ChevronDown className="size-5" />
              </Button>
            </PopoverTrigger>
          </Popover>
        </div>
      </div>
      <div></div>
    </div>
  );
};
