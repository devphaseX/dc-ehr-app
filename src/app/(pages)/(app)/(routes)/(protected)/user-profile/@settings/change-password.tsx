"use client";

import {
  changePasswordSchema,
  ChangePasswordForm,
} from "@/app/(pages)/(auth)/(recover-password)/reset-password/schema";

import {
  UpdateProfileForm,
  updateProfileSchema,
} from "@/app/(pages)/(auth)/sign-up/schema";
import { FormPasswordInput } from "@/components/form/form-password-input";
import { FormInput } from "@/components/form/input";
import { FormLabel } from "@/components/form/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useChangePassword } from "@/features/api/mutation/use-change-password";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

export const ChangePassword = (props: Props) => {
  const { mutate, isPending } = useChangePassword();
  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    disabled: isPending,
  });

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h4 className="font-semibold text-xl">Change Password</h4>
        <Separator className="bg-neutral-100" />
      </div>
      <Form {...form}>
        <form className="" onSubmit={form.handleSubmit((data) => mutate(data))}>
          <div className="flex items-center gap-x-6 [&>*]:flex-1">
            <FormField
              name="oldPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel text="Current password" />
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
                <FormItem>
                  <FormLabel text="New password" />
                  <FormPasswordInput
                    placeholder="Type your password"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end mt-8">
            <div className="flex items-center gap-x-6">
              <Button
                className="rounded-[48px] px-6 py-3 w-fit h-fit text-primary-500 bg-primary-50 font-semibold text-sm"
                disabled={form.formState.disabled}
              >
                Don’t remember password?
              </Button>
              <Button className="rounded-[48px] px-6 py-3 w-fit h-fit bg-primary-500 text-white font-semibold text-sm">
                Change password
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
