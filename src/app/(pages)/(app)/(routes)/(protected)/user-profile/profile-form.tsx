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
import { formatDate } from "@/lib/utils";

type Props = {
  user: User;
  preview?: boolean;
  withExtra?: boolean;
};

export const ProfileForm = (props: Props) => {
  const user = props.user;
  const { mutate, isPending } = useProfileUpdate();

  console.log({ date: user.dateOfBirth });

  const form = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
    disabled: props.preview || isPending,
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.userName,
      email: user.email,
      dateOfBirth: user.dateOfBirth ? formatDate(user.dateOfBirth) : undefined,
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
                    onChange={(ev) => {
                      let value = ev.target.value;
                      // If the user enters a slash, format the preceding section
                      if (
                        value.endsWith("/") &&
                        !(field.value ?? "").endsWith("/")
                      ) {
                        const parts = value.split("/");
                        if (parts[0].length === 1) {
                          parts[0] = parts[0].padStart(2, "0");
                        }
                        if (parts[1] && parts[1].length === 1) {
                          parts[1] = parts[1].padStart(2, "0");
                        }
                        value = parts.join("/");
                      } else if (/^\d{3}$/.test(value)) {
                        const [, day, month] = /^(\d{2})(\d)$/.exec(value)!;
                        value = `${day}/${month}`;
                      } else {
                        // Remove any non-digit and non-slash characters
                        value = value.replace(/[^\d/]/g, "");
                      }

                      let formattedDate = "";
                      const parts = value.split("/");

                      // Format day
                      if (parts[0]) {
                        let day = parts[0].slice(0, 2);
                        if (parseInt(day) > 31) day = "31";
                        formattedDate += day;
                      }

                      // Format month
                      if (
                        parts[1] ||
                        (parts[0] &&
                          parts[0].length === 2 &&
                          value.endsWith("/"))
                      ) {
                        formattedDate += "/";
                        if (parts[1]) {
                          let month = parts[1].slice(0, 2);

                          if (parseInt(month) > 12) month = "12";
                          formattedDate += month;
                        }
                      }

                      // Format year
                      if (
                        parts[2] ||
                        (parts[1] &&
                          parts[1].length === 2 &&
                          value.endsWith("/"))
                      ) {
                        formattedDate += "/";
                        if (parts[2]) {
                          let year = parts[2].slice(0, 4);
                          formattedDate += year;
                        }
                      }

                      console.log({ formattedDate });
                      form.setValue("dateOfBirth", formattedDate);
                    }}
                    value={field.value}
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
