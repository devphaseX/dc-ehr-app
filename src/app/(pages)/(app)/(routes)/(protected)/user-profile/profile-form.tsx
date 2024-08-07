"use client";

import {
  UpdateProfileForm,
  updateProfileSchema,
} from "@/app/(pages)/(auth)/sign-up/schema";
import { FormInput } from "@/components/form/input";
import { FormLabel } from "@/components/form/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useProfileUpdate } from "@/features/api/mutation/use-profile-update";
import { User } from "@/lib/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

type Props = {
  user: User;
  preview?: boolean;
  withExtra?: boolean;
};

export const ProfileForm = (props: Props) => {
  const user = props.user;
  const { mutate, isPending } = useProfileUpdate();

  const form = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
    disabled: props.preview || isPending,
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.userName,
      email: user.email,
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toLocaleDateString()
        : undefined,
      country: user.country ?? undefined,
      state: user.state ?? undefined,
    },
  });

  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h4 className="font-semibold text-xl">Profile Details</h4>
        <Separator className="bg-neutral-100" />
      </div>
      <Form {...form}>
        <form
          className="space-y-16"
          onSubmit={form.handleSubmit((data) => {
            mutate(data);
          })}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-8">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel text="First name" />
                  <FormInput {...field} placeholder="Type your first name" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel text="Last name" />
                  <FormInput {...field} placeholder="Type your last name" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel text="Username" />
                  <FormInput {...field} placeholder="Type your username" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel text="Email" />
                  <FormInput
                    {...field}
                    placeholder="Type your email"
                    type="email"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="dateOfBirth"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel text="Date of birth" optional />
                  <FormInput
                    {...field}
                    value={
                      field.value
                        ? format(new Date(field.value), "dd/MM/yyyy")
                        : undefined
                    }
                    placeholder="dd/mm/yyyy"
                    type="text"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <h4 className="font-semibold text-xl">Profile Details</h4>
              <Separator className="bg-neutral-100" />
            </div>
            <div className="space-y-16">
              <div className="w-full flex items-center [&>*]:flex-1 gap-x-6">
                <FormField
                  name="country"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel text="Country" optional />
                      <FormInput {...field} placeholder="Type your email" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="state"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel text="State" optional />
                      <FormInput {...field} placeholder="Type your email" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full flex justify-end mt-16">
                <div className="flex items-center gap-x-6">
                  <Button
                    type="button"
                    onClick={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set("tab", "settings");
                      router.push(url.toString());
                    }}
                    className="rounded-[48px] px-6 py-3 w-fit h-fit text-primary-500 bg-primary-50 font-semibold text-sm"
                  >
                    Cancel
                  </Button>
                  <Button className="rounded-[48px] px-6 py-3 w-fit h-fit bg-primary-500 text-white font-semibold text-sm">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
