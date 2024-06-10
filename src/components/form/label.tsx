import { cn } from '@/lib/utils';
import { FormLabel as _FormLabel } from '../ui/form';

type FormLabelProps = { text: string; className?: string };

export const FormLabel = ({ text, className }: FormLabelProps) => {
  return (
    <_FormLabel
      className={cn('text-base font-semibold text-neutral-800', className)}
    >
      {text}
    </_FormLabel>
  );
};
