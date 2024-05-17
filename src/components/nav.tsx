'use client';
import { useSession } from 'next-auth/react';
import { Container } from '@/components/container';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Button } from './ui/button';
import { Bell, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { FileIcon } from './icons/file-icon';
import { BookSavedIcon } from './icons/book-saved';
import { CloudIcon } from './icons/cloud';
import { useEffect, useRef, useState } from 'react';
import { useResizeObserver } from 'usehooks-ts';

type NavRoute = {
  label: string;
  path: `/${string}`;
  Icon?: React.ReactNode;
};

const authRoutes: Array<NavRoute> = [
  {
    label: 'Resources',
    path: '/resources',
    Icon: <FileIcon />,
  },
  {
    label: 'Library',
    path: '/library',
    Icon: <BookSavedIcon />,
  },
  {
    label: 'Upload',
    path: '/upload',
    Icon: <CloudIcon />,
  },
];

export function Nav() {
  const session = useSession();
  const pathname = usePathname();
  const activeRoute = useSelectedLayoutSegment();

  const navRef = useRef<HTMLElement | null>(null);

  const [isFixed, setIsFixed] = useState(false);
  const { height } = useResizeObserver({ ref: navRef });

  useEffect(() => {
    const handleScroll = () => {
      if (typeof height === 'undefined') return;
      const scrollTop = window.scrollY;
      setIsFixed(scrollTop > height); // Adjust threshold as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [height]);

  return (
    <nav
      ref={navRef}
      className={cn(
        'absolute top-0 inset-x-0 z-50 py-[22px] border-b border-neutral-100 h-[88px] bg-white',
        isFixed && 'fixed'
      )}
    >
      <Container outerClassName="px-[48px]" className="max-w-[100%] w-full">
        <div className="flex items-center justify-between">
          <Logo className="w-[165px] h-10" />
          {true ? (
            <>
              <nav className="flex items-center">
                <ul className="flex items-center gap-x-10">
                  {authRoutes.map(({ label, path, Icon }) => {
                    const routeActive =
                      activeRoute?.replace(/^([^/].*)/, '/$&') === path &&
                      'text-primary-500';
                    return (
                      <Link
                        href={path}
                        key={path}
                        className={cn(
                          'group text-neutral-400 font-medium relative flex items-center gap-x-2',
                          routeActive && 'text-primary-500',
                          'hover:text-primary-500'
                        )}
                      >
                        {Icon}
                        {label}
                        <div
                          className={cn(
                            ' absolute inset-x-0 h-[3px] bg-primary-500 -bottom-[2.05rem] invisible transition-all delay-100',
                            routeActive && 'visible',
                            'group-hover:visible'
                          )}
                        ></div>
                      </Link>
                    );
                  })}
                </ul>
              </nav>
              <div className="flex items-center gap-x-6 w-[165px] justify-end">
                <div className="inline-flex h-6 w-6">
                  <Bell className="w-full h-full text-neutral-400 " />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="p-0 h-10 w-10 bg-transparent hover:bg-transparent rounded-full border-none relative">
                      <Avatar className="w-full h-full">
                        <AvatarImage src="/imgs/avatar.png" alt="profile" />
                        <AvatarFallback>F</AvatarFallback>
                      </Avatar>
                      <div
                        className="absolute w-4 h-4 p-[1px] bg-white rounded-full 
                          flex items-center justify-center bottom-0 -right-1 z-[10]"
                      >
                        <span
                          className="w-full h-full inline-flex justify-center
                           items-center bg-primary-500 rounded-full  "
                        >
                          <ChevronDown className="h-[14px] w-[14px] stroke-[2px] text-white" />
                        </span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-x-2">
              <div className="flex justify-center">
                <Link
                  className="flex items-center justify-center
                   h-fit text-primary-500 font-bold text-sm border border-primary-500 rounded-[4px]
                   leading-[100%]  w-fit px-6 py-3"
                  href="/sign-in"
                >
                  Sign in
                </Link>
              </div>
              <Link
                className="flex items-center justify-center bg-neutral-800 px-6 py-3 rounded-[4px] h-fit w-fit
                 text-white font-bold hover:text-primary-50/80 leading-[100%] text-sm"
                href="/sign-up"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
}
