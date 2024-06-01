import React, { useState } from 'react';
import { Input } from './ui/input';
import { Eye, EyeOffIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? 'text' : 'password'}
        ref={ref}
        className={cn(
          `py-4 px-6 w-full h-fit  text-base text-neutral-900
          placeholder:text-neutral-300 bg-neutral-50 rounded-[8px] border-none !ring-0 !ring-offset-0 !ring-transparent`,
          className
        )}
      />

      <span
        className="absolute right-[18px] top-1/2 -translate-y-1/2"
        onClick={() => setShowPassword((show) => !show)}
      >
        {showPassword ? (
          <EyeOffIcon className="size-6 text-neutral-200" />
        ) : (
          <Eye className="size-6 text-neutral-200" />
        )}
      </span>
    </div>
  );
});
