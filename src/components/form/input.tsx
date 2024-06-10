import React from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, disabled, type, ...props }, ref) => {
    const { pending } = useFormStatus();
    return (
      <Input
        className={cn(
          `py-4 px-6 w-full h-fit  text-base text-neutral-900
          placeholder:text-neutral-300 bg-[#FAFBFB] rounded-[8px] border-none !ring-0 !ring-offset-0 !ring-transparent`,
          className
        )}
        ref={ref}
        {...props}
        disabled={disabled || pending}
      />
    );
  }
);
