import { cn } from '@/lib/utils';
import { FormLabel as _FormLabel } from '../ui/form';

type FormLabelProps = { text: string; className?: string; optional?: boolean };

export const FormLabel = ({ text, className, optional }: FormLabelProps) => {
  return (
    <_FormLabel
      className={cn('text-base font-semibold text-neutral-800', className)}
    >
      {text} {optional && <span className="text-neutral-400">(optional)</span>}
    </_FormLabel>
  );
};
