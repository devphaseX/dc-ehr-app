"use client";

import { useState } from "react";
import { Stage, stageMeta, useSignUpContext } from "../provider";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormLabel } from "@/components/form/label";
import { FormInput } from "@/components/form/input";
import { Button } from "@/components/ui/button";

const stage: Stage = "info";
const GetUserInfo = () => {
  const { form, next } = useSignUpContext();
  const [fields] = useState(stageMeta[stage]?.fields);

  if (!form) {
    throw new Error("Sign up form context not set");
  }

  if (!fields) {
    throw new Error(`Missing fields for the ${stage} stage`);
  }

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-4">
        <h3 className="text-[28px] text-neutral-800 font-bold">
          Register Your Account
        </h3>
        <p className="text-lg text-neutral-500">
          Enter your correct detail to continue with app
        </p>
      </div>

      <div className="space-y-6">
        <FormField
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel text="First name" />
              <FormInput {...field} placeholder="Type your firstName" />
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
              <FormInput {...field} placeholder="Type your lastName" />
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

        {/* <FormItem className="space-x-6 flex items-center space-y-0 w-full [&>*]:flex-1">
          <FormField
            name="industry"
            control={form.control}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel text="Industry" />
                <FormInput {...field} placeholder="Type your email" />
              </FormItem>
            )}
          />
          <FormField
            name="categories"
            control={form.control}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel text="Categories" />
                <FormInput {...field} placeholder="Type your email" />
              </FormItem>
            )}
          />
        </FormItem> */}
        <Button
          type="button"
          onClick={() => next?.()}
          className="w-full h-fit p-4 text-base text-white font-semibold
        rounded-[56px] bg-primary-500 !mt-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default GetUserInfo;
