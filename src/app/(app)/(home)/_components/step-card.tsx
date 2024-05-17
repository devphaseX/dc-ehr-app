import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type StepCardProps = {
  index: number;
  step: string;
  process: string;
  highlight?: boolean;
};

export const StepCard = ({
  index,
  step,
  process,
  highlight,
}: StepCardProps) => {
  return (
    <Card
      className={cn(
        'p-6 flex items-start bg-neutral-50 gap-x-4 border-none shadow-none',
        highlight && 'bg-primary-500'
      )}
    >
      <div
        className={cn(
          `rounded-full size-12 bg-neutral-800 
      flex-shrink-0 text-lg text-white font-bold flex items-center justify-center`,
          highlight && 'text-primary-500 bg-white'
        )}
      >
        {index}
      </div>
      <div className="space-y-2">
        <CardHeader className="p-0">
          <CardTitle
            className={cn(
              'font-bold text-lg text-neutral-800',
              highlight && 'text-white'
            )}
          >
            {step}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CardDescription
            className={cn(
              'text-base text-neutral-600',
              highlight && 'text-white'
            )}
          >
            {process}
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  );
};
