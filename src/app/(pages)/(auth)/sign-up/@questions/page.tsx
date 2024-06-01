'use client';

import { useRef, useState } from 'react';
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
import { useResizeObserver } from 'usehooks-ts';
import { QuestionItemForm } from './question-form';
import { FormField, FormItem } from '@/components/ui/form';

const stageTag: Stage = 'security-questions';
const questions = [
  'What is your favorite food?',
  'What is your pet name?',
  'Which city were you born?',
];

const SELECT_QUESTION_SIZE = 3;
const SecurityQuestions = () => {
  const { form, stageMeta, stage } = useSignUpContext();
  const [stageFields] = useState(stageMeta[stageTag]?.fields);

  if (stageTag !== stage) {
    throw new Error(
      `Mismatch current internal stage "${stage}" to url stage "${stage}"`
    );
  }

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

  const { width } = useResizeObserver({ ref: selectQuestionDropDownRef });
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
                <div ref={selectQuestionDropDownRef} className="space-y-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="py-4 px-6 bg-neutral-50 hover:bg-neutral-100 border-none rounded-[8px] w-full
                 text-neutral-300 text-base h-fit flex items-center justify-between"
                      >
                        Select your security question
                        <ChevronDown className="size-6" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent style={{ width: `${width}px` }}>
                      <div className="flex flex-col gap-y-4 w-full">
                        {questions.map((question) => {
                          const questionIndex = fields.findIndex(
                            (field) => field.question === question
                          );
                          const selected = questionIndex !== -1;
                          const selectedQuestionNo = fields.length;
                          return (
                            <DropdownMenuItem
                              key={question}
                              className="flex justify-between items-center"
                              onClick={() => {
                                if (!selected) {
                                  if (
                                    selectedQuestionNo >= SELECT_QUESTION_SIZE
                                  ) {
                                    return;
                                  }
                                  append({ question, answer: '' });
                                } else {
                                  remove(questionIndex);
                                }
                              }}
                            >
                              {question}
                              {selected && (
                                <Check className="size-4 text-neutral-400" />
                              )}
                            </DropdownMenuItem>
                          );
                        })}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

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
        rounded-[56px] bg-primary-500 !mt-10"
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
