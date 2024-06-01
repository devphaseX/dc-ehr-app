'use client';

import { useLayoutEffect, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { QuestionItemForm } from './question-form';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { SecurityQuestionForm, securityQuestionSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

const questions = [
  'What is your favorite food?',
  'What is your pet name?',
  'Which city were you born?',
];

const SecurityQuestions = () => {
  const form = useForm<SecurityQuestionForm>({
    resolver: zodResolver(securityQuestionSchema),
  });

  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  useLayoutEffect(() => {
    questions.forEach((question) => {
      append({ question, answer: '' });
    });

    return () => {
      questions.forEach((_, i) => {
        remove(i);
      });
    };
  }, []);

  return (
    <div className="max-w-[580px] w-full mx-auto py-[124px]">
      <div className="space-y-10">
        <div className="space-y-3">
          <h3 className="text-[28px] text-neutral-800 font-bold">
            Fill Your Security Questions
          </h3>
          <p className="text-lg text-neutral-400">
            You need to remember your security answer, You will be asked when
            you want to reset your password
          </p>
        </div>

        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="questions"
              render={() => (
                <FormItem className="space-y-0">
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
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-fit p-4 text-base text-white font-semibold 
              rounded-[56px] bg-primary-500 mt-10"
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SecurityQuestions;
