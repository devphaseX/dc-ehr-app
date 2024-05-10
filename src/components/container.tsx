import { cn } from '@/lib/utils';

export const Container = ({
  className,
  children,
  outerClassName,
}: {
  className?: string;
  children: React.ReactNode;
  outerClassName?: string;
}) => {
  return (
    <div className={cn('px-[120px]', outerClassName)}>
      <div className={cn('mx-auto max-w-screen-xl w-full', className)}>
        {children}
      </div>
    </div>
  );
};
