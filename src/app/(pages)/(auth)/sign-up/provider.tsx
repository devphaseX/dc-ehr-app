"use client";

import React, { useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "./schema";
import { SignUpForm } from "./schema";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { Form } from "@/components/ui/form";
import { registerAction } from "@/actions/sign-up/handler";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export const formStages = [
  "info",
  "password",
  "security-questions",
  "verify-account",
] as const;

export type Stage = (typeof formStages)[number];
type SignUpStages = { [Task in Stage]: Exclude<Stage, Task> | null };

const signUpStages: SignUpStages = {
  info: "password",
  password: "security-questions",
  "security-questions": "verify-account",
  "verify-account": null,
};

type SignUpContext = {
  form?: UseFormReturn<SignUpForm>;
  stage?: Stage;
  next?: () => void;
  stageMeta: StageMeta;
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

export const stageMeta: StageMeta = {
  info: {
    index: 1,
    fields: ["firstName", "lastName", "username", "email"],
  },
  password: { index: 2, fields: ["password", "confirmPassword"] },
  "security-questions": { index: 3, fields: [] },
  "verify-account": { index: 4, fields: [] },
};

const SignUpContext = React.createContext<SignUpContext>({
  stageMeta: stageMeta,
});

export const useSignUpContext = () => useContext(SignUpContext);

export const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
  const { execute: registerUser, status } = useAction(registerAction, {
    onSettled: (_, { message, error }) => {
      if (message) {
        next();
      } else {
        toast.error(error);
      }
    },
  });

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      securityQuestions: [],
    },
    disabled: status === "executing",
  });

  const [stage, setStage] = useQueryState(
    "stage",
    parseAsStringEnum([...formStages])
      .withDefault("info")
      .withOptions({ throttleMs: 500 }),
  );

  async function next() {
    const { fields, index } = stageMeta[stage] ?? {};

    if (!(fields && typeof index === "number")) {
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
        <Form {...form}>
          <form
            {...(stage === "security-questions" && {
              onSubmit: form.handleSubmit((data) => {
                registerUser(data);
              }),
            })}
            className="w-full"
          >
            {children}
          </form>
        </Form>
      </SignUpContext.Provider>
    </>
  );
};
