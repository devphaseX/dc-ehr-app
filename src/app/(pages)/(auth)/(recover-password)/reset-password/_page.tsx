"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormLabel } from "@/components/form/label";
import { Button } from "@/components/ui/button";
import { FormPasswordInput } from "@/components/form/form-password-input";

import { ChangePasswordForm, changePasswordSchema } from "./schema";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type ResetPasswordFormProps = {
  changePassword: (props: {
    password: string;
  }) => Promise<{ message?: string; error?: string }>;
};

export const ResetPasswordForm = ({
  changePassword,
}: ResetPasswordFormProps) => {
  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const [resetLoading, setResetLoading] = useState(false);
  const [resetCompleted, setResetCompleted] = useState(false);

  const router = useRouter();

  if (resetCompleted) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="max-w-[580px] w-full text-center space-y-6">
          <div className="space-y-3">
            <h3 className="text-[28px] font-semibold text-neutral-800">
              Password Changed Successfully
            </h3>

            <p className="text-lg text-neutral-500">
              Welcome James, You can now share and download alot of free
              resources from your resources page
            </p>
          </div>
          <Button
            type="button"
            onClick={() => {
              router.refresh();
              router.push("/");
            }}
            className="h-fit px-8 py-4 text-base text-white font-semibold
      rounded-[56px] bg-primary-500"
          >
            Go to dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full flex items-center">
      <div className="space-y-10 max-w-[580px] w-full mx-auto">
        <div className="space-y-10">
          <div className="space-y-12">
            <Link
              href="/forget-password"
              onClick={() => {}}
              className="text-primary-500 text-sm flex items-center gap-x-2"
            >
              <ChevronLeft className="size-5" />
              Back
            </Link>
            <div className="space-y-4">
              <h3 className="text-[28px] text-neutral-800 font-bold">
                Reset Your Password
              </h3>
              <p className="text-lg text-neutral-400">
                You need to remember your security answer, You will be asked
                when you wan to reset your password
              </p>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (data) => {
                try {
                  setResetLoading(true);
                  const { message, error } = await changePassword({
                    password: data.newPassword,
                  });

                  if (message) {
                    toast.success(message);
                    setResetCompleted(true);
                  } else {
                    toast.error(error ?? "failed to reset password");
                  }
                } finally {
                  setResetLoading(false);
                }
              })}
            >
              <div className="space-y-6">
                <FormField
                  name="oldPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel text="Password" />
                      <FormPasswordInput
                        placeholder="Type your password"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="newPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel text="Confirm password" />
                      <FormPasswordInput
                        placeholder="Retype your password"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full h-fit p-4 text-base text-white font-semibold
        rounded-[56px] bg-primary-500 !mt-10"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
