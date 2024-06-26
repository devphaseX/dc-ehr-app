'use client';

import React, { useContext } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpFormSchema } from './schema';
import { SignUpForm } from './schema';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { Form } from '@/components/ui/form';

export const formStages = ['info', 'password', 'security-questions'] as const;

export type Stage = (typeof formStages)[number] | 'account-created';
type SignUpStages = { [Task in Stage]: Exclude<Stage, Task> | null };

const signUpStages: SignUpStages = {
  info: 'password',
  password: 'security-questions',
  'security-questions': 'account-created',
  'account-created': null,
};

type SignUpContext = {
  form?: UseFormReturn<SignUpForm>;
  stage?: Stage;
  next?: () => void;
  stageMeta: Omit<StageMeta, 'account-created'>;
  setStage?: (stage: Stage) => void;
  currentStageValid?: boolean;
  accountCreated?: boolean;
  syncStageData?: (data: unknown) => Promise<void> | void;
};

type StageMeta = {
  [K in Stage]: {
    index: number;
    fields: Array<keyof SignUpForm>;
  };
};

export const stageMeta: Omit<StageMeta, 'account-created'> = {
  info: {
    index: 1,
    fields: ['fullName', 'username', 'email', 'industry', 'categories'],
  },
  password: { index: 2, fields: ['password', 'confirmPassword'] },
  'security-questions': { index: 3, fields: [] },
};

const SignUpContext = React.createContext<SignUpContext>({
  stageMeta: stageMeta,
});

export const useSignUpContext = () => useContext(SignUpContext);

export const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      industry: '',
      password: '',
      confirmPassword: '',
      categories: '',
      securityQuestions: [],
    },
  });

  const [stage, setStage] = useQueryState(
    'stage',
    parseAsStringEnum([...formStages, 'account-created'])
      .withDefault('info')
      .withOptions({ throttleMs: 500 })
  );

  async function next() {
    if (stage === 'account-created') return;
    const { fields, index } = stageMeta[stage] ?? {};

    if (!(fields && typeof index === 'number')) {
      return;
    }

    const valid = await form.trigger(fields as Array<keyof SignUpForm>, {
      shouldFocus: true,
    });

    if (!valid) {
      return;
    }

    const nextStage = signUpStages[stage];

    if (!nextStage) return;

    setStage(nextStage);
  }

  return (
    <>
      <SignUpContext.Provider
        value={{
          form,
          stage,
          next,
          stageMeta,
          accountCreated: true,
          setStage,
        }}
      >
        {stage !== 'account-created' ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})} className="w-full">
              {children}
            </form>
          </Form>
        ) : (
          children
        )}
      </SignUpContext.Provider>
    </>
  );
};
