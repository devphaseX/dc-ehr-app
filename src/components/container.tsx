import { cn } from '@/lib/utils';

type ContainerProp = {
  className?: string;
  children: React.ReactNode;
  outerClassName?: string;
  type?: 'sm' | 'md';
};

export const Container = ({
  className,
  children,
  outerClassName,
  type = 'md',
}: ContainerProp) => {
  if (type === 'md') {
    return (
      <div className={cn('px-[120px]', outerClassName)}>
        <div className={cn('mx-auto max-w-[1201px] w-full', className)}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('px-10', outerClassName)}>
      <div className="mx-auto max-w-[1360px]">{children}</div>
    </div>
  );
};
