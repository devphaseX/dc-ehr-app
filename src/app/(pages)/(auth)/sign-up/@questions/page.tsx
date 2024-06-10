'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { Stage, useSignUpContext } from '../provider';
import { useFieldArray } from 'react-hook-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { useOnClickOutside, useResizeObserver } from 'usehooks-ts';
import { QuestionItemForm } from './question-form';
import { FormField, FormItem } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUpdate } from '@/hooks/useUpdate';

const stageTag: Stage = 'security-questions';
const questions = [
  'What is your favorite food?',
  'Which city do you live in?',
  'What is your pet name?',
  'Which city were you born?',
];

const SELECT_QUESTION_SIZE = 3;
const SecurityQuestions = () => {
  const { form, stageMeta, stage } = useSignUpContext();
  const [stageFields] = useState(stageMeta[stageTag]?.fields);
  const router = useRouter();
  const [questionModalOpen, setQuestionModalOpen] = useState(false);

  if (!form) {
    throw new Error('Sign up form context not set');
  }

  if (!stageFields) {
    throw new Error(`Missing fields for the ${stage} stage`);
  }

  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: 'securityQuestions',
  });

  const selectQuestionDropDownRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(selectQuestionDropDownRef, () => {
    setQuestionModalOpen(false);
  });
  useLayoutEffect(() => {
    if (stageTag !== stage) {
      router.push('/sign-up');
    }
  }, []);

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-[28px] text-neutral-800 font-bold">
          Fill Your Security Questions
        </h3>
        <p className="text-lg text-neutral-400">
          You need to remember your security answer, You will be asked when you
          want to reset your password
        </p>
      </div>

      <div>
        <div className="space-y-4">
          <h5 className="text-neutral-800 text-xl font-semibold">
            Select your security question
          </h5>

          <FormField
            control={form.control}
            name="securityQuestions"
            render={() => (
              <FormItem>
                <div className="space-y-10">
                  <div className="space-y-4" ref={selectQuestionDropDownRef}>
                    <Button
                      onClick={() => setQuestionModalOpen((open) => !open)}
                      className={cn(
                        `py-4 px-6 bg-neutral-50 hover:bg-neutral-100 
                        rounded-[8px] w-full text-neutral-300 text-base
                         h-fit flex items-center justify-between border border-neutral-50`,
                        questionModalOpen && 'border-neutral-900'
                      )}
                    >
                      Select your security question
                      <ChevronDown className="size-6" />
                    </Button>

                    {questionModalOpen && (
                      <div className="p-6 bg-neutral-50 shadow-none rounded-[12px] space-y-6">
                        <p className="text-xs text-neutral-500 font-josefin">{`${fields.length} / ${SELECT_QUESTION_SIZE} Questions`}</p>
                        <div className="flex flex-col gap-y-6 w-full">
                          {questions.map((question) => {
                            const questionIndex = fields.findIndex(
                              (field) => field.question === question
                            );
                            const selected = questionIndex !== -1;
                            const selectedQuestionNo = fields.length;
                            return (
                              <div
                                key={question}
                                className={cn(
                                  `flex justify-between items-center
                             p-0 text-base font-josefin text-neutral-900 !bg-transparent`,
                                  selected && 'text-neutral-400'
                                )}
                                onClick={() => {
                                  if (!selected) {
                                    if (
                                      selectedQuestionNo >= SELECT_QUESTION_SIZE
                                    ) {
                                      return;
                                    }
                                    append({ question, answer: '' });
                                    setQuestionModalOpen(false);
                                  } else {
                                    remove(questionIndex);
                                  }
                                }}
                              >
                                {question}
                                {selected && (
                                  <Check className="size-6 text-primary-500" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-8">
                    {fields.map((field, index) => (
                      <QuestionItemForm
                        key={index}
                        index={index}
                        form={form}
                        register={form.register}
                        item={field}
                        update={(index, question) => update(index, question)}
                      />
                    ))}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-fit p-4 text-base text-white font-semibold 
        rounded-[56px] bg-primary-500 !mt-8"
                  >
                    Continue
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SecurityQuestions;
