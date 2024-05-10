import { cn } from '@/lib/utils';

type BookSavedIconProps = React.SVGProps<SVGSVGElement>;

export const BookSavedIcon = ({ className }: BookSavedIconProps) => (
  <svg
    className={cn('w-6 h-6 stroke-[1.5] stroke-current  fill-none', className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.5 4.67001V16.74C22.5 17.7 21.72 18.6 20.76 18.72L20.43 18.76C18.25 19.05 14.89 20.16 12.97 21.22C12.71 21.37 12.28 21.37 12.01 21.22L11.97 21.2C10.05 20.15 6.70003 19.05 4.53003 18.76L4.23999 18.72C3.27999 18.6 2.5 17.7 2.5 16.74V4.66C2.5 3.47 3.46997 2.57001 4.65997 2.67001C6.75997 2.84001 9.93997 3.90003 11.72 5.01003L11.97 5.16C12.26 5.34 12.74 5.34 13.03 5.16L13.2 5.05001C13.83 4.66001 14.63 4.27001 15.5 3.92001V8.00002L17.5 6.67001L19.5 8.00002V2.78005C19.77 2.73005 20.03 2.70002 20.27 2.68002H20.33C21.52 2.58002 22.5 3.47001 22.5 4.67001Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.5 5.48999V20.49"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.5 2.78003V8L17.5 6.66998L15.5 8V3.91998C16.81 3.39998 18.27 2.98003 19.5 2.78003Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
