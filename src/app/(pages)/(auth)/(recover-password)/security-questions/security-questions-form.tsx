"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  RecoverySecurityQuestion,
  GetSecurityQuestionData,
  recoverySecurityAnswerSchema,
} from "@/lib/response";
import { TypeOf, isDirty, z } from "zod";
import { FormLabel } from "@/components/form/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitRecoverySecurityAnswer } from "@/features/api/mutation/use-submit-recovery-security-answer";
import { toast } from "sonner";
import { submitRecoverSecurityAnswersAction } from "@/actions/submit-recovery-security-answers/handler";
import { useAction } from "next-safe-action/hooks";

type Props = {
  questions: RecoverySecurityQuestion;
  email: string;
};

const schema = z.object({ answers: recoverySecurityAnswerSchema });

const RecoverySecurityQuestionForm = ({
  questions: prepQuestions,
  email,
}: Props) => {
  const questions = useMemo(
    () =>
      new Map(
        prepQuestions.map<[string, RecoverySecurityQuestion[number]]>(
          (item) => [item.questionId, item],
        ),
      ),
    [prepQuestions],
  );

  const [submittingAnswers, setSubmittingAnswers] = useState(false);

  const form = useForm<TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
    disabled: submittingAnswers,
  });
  const router = useRouter();

  const { fields, update, remove, insert } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  const selectQuestionDropDownRef = useRef<HTMLDivElement | null>(null);
  const insertedQuestions = useRef(false);
  useEffect(() => {
    if (insertedQuestions.current) return;
    insertedQuestions.current = true;
    Array.from(questions, ([_, question], i) => {
      insert(i, question);
    });
  }, [questions]);

  if (!fields.length) return null;

  return (
    <div className="pt-20">
      <div className="h-full w-full flex items-center justify-center">
        <div className="max-w-[580px] w-full text-center space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (data) => {
                try {
                  setSubmittingAnswers(true);
                  const { message, error } =
                    await submitRecoverSecurityAnswersAction({
                      answers: data.answers,
                      email,
                    });

                  if (error) {
                    return toast.error(error);
                  }
                  toast.success(message);
                  router.push("/reset-password");
                } finally {
                  setSubmittingAnswers(false);
                }
              })}
            >
              <div className="space-y-4 mb-8">
                <h3 className="text-[28px] text-neutral-800 font-bold">
                  Fill Your Security Questions
                </h3>
                <p className="text-lg text-neutral-400">
                  You are to provide an answer to these security questions.
                </p>
              </div>

              <div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="answers"
                    render={() => (
                      <FormItem>
                        <div className="space-y-10">
                          <div className="space-y-8">
                            {fields.map((field, index) => {
                              return (
                                <FormField
                                  control={form.control}
                                  name={`answers.${index}.securityAnswer`}
                                  render={({ field: innerField }) => (
                                    <FormItem className="space-y-6">
                                      <div className="flex items-center gap-x-2">
                                        <div
                                          className="size-6 rounded-full
                                flex items-center text-white text-sm
                                 justify-center bg-primary-500"
                                        >
                                          {index + 1}
                                        </div>
                                        <FormLabel
                                          text={
                                            questions.get(field.questionId)
                                              ?.question ?? ""
                                          }
                                        />
                                      </div>
                                      <FormControl>
                                        <Input
                                          {...innerField}
                                          className="border-0 text-base !ring-0 !ring-offset-0 !ring-transparent
                                    text-neutral-800 placeholder:text-neutral-400  rounded-none
                                    py-4 px-0 w-full h-fit border-b border-neutral-100"
                                          placeholder="Type your answer"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              );
                            })}
                          </div>

                          <Button
                            type="submit"
                            disabled={form.formState.disabled}
                            className="w-full h-fit p-4 text-base text-white font-semibold
          rounded-[56px] bg-primary-500 !mt-8"

                            // onClick={() => next?.()}
                          >
                            Continue
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export { RecoverySecurityQuestionForm };
