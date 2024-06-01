import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import { PasswordInput } from '../password-input';

export interface FormPasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const FormPasswordInput = forwardRef<
  HTMLInputElement,
  FormPasswordInputProps
>(({ className, disabled, ...props }, ref) => {
  const { pending } = useFormStatus();

  return (
    <PasswordInput
      placeholder="Password"
      ref={ref}
      disabled={pending || Boolean(disabled)}
      {...props}
    />
  );
});
