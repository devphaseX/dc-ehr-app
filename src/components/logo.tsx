import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className="cursor-pointer">
      <div className={cn('relative w-[165px] h-[40px]', className)}>
        <Image src="/imgs/logo.svg" alt="logo" fill />
      </div>
    </Link>
  );
};
