import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('relative w-[165px] h-[40px]', className)}>
      <Image src="/imgs/logo.svg" alt="logo" fill />
    </div>
  );
};
