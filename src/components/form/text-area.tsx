import React from 'react';
import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';
import { Textarea } from '../ui/textarea';

export interface FormTextareaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {}

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps
>(({ className, disabled, type, ...props }, ref) => {
  const { pending } = useFormStatus();
  return (
    <Textarea
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
});
