import { FormLabel } from '@/components/form/label';
import { FormControl, FormItem } from '@/components/ui/form';
import { UseFormRegister, UseFormReturn, useWatch } from 'react-hook-form';
import { SignUpForm } from '../schema';
import { Input } from '@/components/ui/input';

type QuestionItem = SignUpForm['securityQuestions'][number] & { id?: string };

export const QuestionItemForm = ({
  index,
  item,
  register,
  update,
  form,
}: {
  item: QuestionItem;
  form: UseFormReturn<SignUpForm>;
  register: UseFormRegister<SignUpForm>;
  index: number;
  update: (index: number, fields: QuestionItem) => void;
}) => {
  const value = useWatch({
    control: form.control,
    name: 'securityQuestions',
  });

  return (
    <FormItem>
      <div className="flex items-center gap-x-2">
        <div
          className="size-6 rounded-full 
      flex items-center text-white text-sm
       justify-center bg-primary-500"
        >
          {index + 1}
        </div>
        <FormLabel text={item.question} />
      </div>
      <FormControl>
        <Input
          {...register(`securityQuestions.${index}.answer`)}
          className="border-0 text-base !ring-0 !ring-offset-0 !ring-transparent
          text-neutral-800 placeholder:text-neutral-400  rounded-none
          py-4 px-0 w-full h-fit border-b border-neutral-100"
          placeholder="Type your answer"
          onChange={(ev) => {
            console.log({ v: ev.target.value });
            update(index, { ...item, answer: ev.target.value });
          }}
          value={value[index]?.answer ?? ''}
        />
      </FormControl>
    </FormItem>
  );
};
