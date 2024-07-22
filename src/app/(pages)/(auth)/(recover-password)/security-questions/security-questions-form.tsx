"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { QuestionItemForm } from "./question-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { SecurityQuestionForm, securityQuestionSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordState } from "../state";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const questions = [
  "What is your favorite food?",
  "What is your pet name?",
  "Which city were you born?",
];

export const SecurityQuestionsForm = () => {
  const form = useForm<SecurityQuestionForm>({
    resolver: zodResolver(securityQuestionSchema),
  });

  const stage = useResetPasswordState(({ stage }) => stage);
  const setStage = useResetPasswordState(({ setStage }) => setStage);

  const router = useRouter();

  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  useLayoutEffect(() => {
    questions.forEach((question) => {
      append({ question, answer: "" });
    });

    return () => {
      questions.forEach((_, i) => {
        remove(i);
      });
    };
  }, []);

  useEffect(() => {
    if (stage !== "security-questions") {
      router.push("/");
    }
  }, []);

  return (
    <div className="w-full mx-auto h-full flex items-center justify-center">
      <div className="max-w-[580px] w-full">
        <div className="space-y-10">
          <div className="space-y-12">
            <Link
              href="/forget-password"
              className="text-primary-500 text-sm flex items-center gap-x-2"
            >
              <ChevronLeft className="size-5" />
              Back
            </Link>
            <div className="space-y-3">
              <h3 className="text-[28px] text-neutral-800 font-bold">
                Fill Your Security Questions
              </h3>
              <p className="text-lg text-neutral-500">
                You need to remember your security answer, You will be asked
                when you want to reset your password
              </p>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {
                setStage("change-password");
                router.push("/change-password");
              })}
            >
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
    </div>
  );
};
