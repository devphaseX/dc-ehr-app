import { cn } from '@/lib/utils';

type FileIconProps = React.SVGProps<SVGSVGElement>;

export const FileIcon = ({ className }: FileIconProps) => (
  <svg
    className={cn('w-6 h-6 stroke-[1.5] stroke-current fill-none', className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.5 7V17C21.5 20 20 22 16.5 22H8.5C5 22 3.5 20 3.5 17V7C3.5 4 5 2 8.5 2H16.5C20 2 21.5 4 21.5 7Z"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <path
      d="M15 4.5V6.5C15 7.6 15.9 8.5 17 8.5H19"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.5 13H12.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.5 17H16.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
