import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export type CategoryTab = {
  label: string;
  tag?: string;
};
export type CategoryTabMap = Map<string, CategoryTab>;

type DiscoverTabProps = {
  categoryTabMap: CategoryTabMap;
  selectedCategory: '_' | string;
  setSelectCategory: (category: string) => void;
};

export const DiscoverTab = ({
  categoryTabMap,
  selectedCategory,
  setSelectCategory,
}: DiscoverTabProps) => {
  return (
    <Tabs
      className="bg-transparent"
      value={selectedCategory}
      onValueChange={setSelectCategory}
    >
      <TabsList className="flex items-center bg-transparent justify-start gap-x-4">
        {Array.from(categoryTabMap).map(([tag, { label }]) => (
          <TabsTrigger
            value={tag}
            className={cn(
              'flex-1 px-6 py-3 rounded-[44px] bg-white !shadow-none border border-neutral-100 text-neutral-400 text-sm font-bold',
              'hover:text-white  hover:bg-neutral-900 hover:border-neutral-900',
              tag == selectedCategory &&
                'data-[state=active]:text-white  data-[state=active]:bg-neutral-900 data-[state=active]:border-neutral-900'
            )}
          >
            {label}
          </TabsTrigger>
        ))}
        <Button
          className={cn(
            'flex-1 px-6 py-[14px]  h-fit w-fit rounded-[44px] bg-white !shadow-none border border-neutral-100 text-neutral-400 text-sm font-bold',
            'hover:text-white  hover:bg-neutral-900 hover:border-neutral-900'
          )}
        >
          Show all
        </Button>
      </TabsList>
    </Tabs>
  );
};
