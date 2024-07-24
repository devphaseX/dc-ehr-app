"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Stage, useSignUpContext } from "../provider";
import { useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { GetSecurityQuestionData } from "@/lib/response";
import { isDirty } from "zod";
import { FormLabel } from "@/components/form/label";
import { Input } from "@/components/ui/input";

const stageTag: Stage = "security-questions";

const SELECT_QUESTION_SIZE = 3;

type Props = {
  questions: GetSecurityQuestionData;
};
const SecurityQuestionsSetForm = ({ questions: prepQuestions }: Props) => {
  const questions = useMemo(
    () =>
      new Map(
        prepQuestions.map<[string, GetSecurityQuestionData[number]]>((item) => [
          item.id,
          item,
        ]),
      ),
    [prepQuestions],
  );
  const { form, stageMeta, stage, next } = useSignUpContext();
  const [stageFields] = useState(stageMeta[stageTag]?.fields);
  const router = useRouter();
  const [questionModalOpen, setQuestionModalOpen] = useState(false);

  if (!form) {
    throw new Error("Sign up form context not set");
  }

  if (!stageFields) {
    throw new Error(`Missing fields for the ${stage} stage`);
  }

  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: "userSecurityQuestions",
  });

  const selectQuestionDropDownRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(selectQuestionDropDownRef, () => {
    setQuestionModalOpen(false);
  });

  useLayoutEffect(() => {
    if (stageTag !== stage) {
      router.push("/sign-up");
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
            name="userSecurityQuestions"
            render={() => (
              <FormItem>
                <div className="space-y-10">
                  <div className="space-y-4" ref={selectQuestionDropDownRef}>
                    <Button
                      type="button"
                      onClick={() => setQuestionModalOpen((open) => !open)}
                      className={cn(
                        `py-4 px-6 bg-neutral-50 hover:bg-neutral-100
                        rounded-[8px] w-full text-neutral-300 text-base
                         h-fit flex items-center justify-between border border-neutral-50`,
                        questionModalOpen && "border-neutral-900",
                      )}
                    >
                      Select your security question
                      <ChevronDown className="size-6" />
                    </Button>

                    {questionModalOpen && (
                      <div className="p-6 bg-neutral-50 shadow-none rounded-[12px] space-y-6">
                        <p className="text-xs text-neutral-500 font-josefin">{`${fields.length} / ${SELECT_QUESTION_SIZE} Questions`}</p>
                        <div className="flex flex-col gap-y-6 w-full">
                          {Array.from(questions, ([_, { id, question }]) => {
                            const questionIndex = fields.findIndex(
                              (field) => field.questionId === id,
                            );
                            const selected = questionIndex !== -1;
                            const selectedQuestionNo = fields.length;
                            return (
                              <div
                                key={question}
                                className={cn(
                                  `flex justify-between items-center
                             p-0 text-base font-josefin text-neutral-900 !bg-transparent`,
                                  selected && "text-neutral-400",
                                )}
                                onClick={() => {
                                  if (!selected) {
                                    if (
                                      selectedQuestionNo >= SELECT_QUESTION_SIZE
                                    ) {
                                      return;
                                    }
                                    append({
                                      questionId: id,
                                      answer: "",
                                    });
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
                    {fields.map((field, index) => {
                      return (
                        <FormField
                          control={form.control}
                          name={`userSecurityQuestions.${index}.answer`}
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
                                    questions.get(field.questionId)?.question ??
                                    ""
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
    </div>
  );
};

export { SecurityQuestionsSetForm };
