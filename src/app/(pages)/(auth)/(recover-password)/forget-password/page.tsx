"use client";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormLabel } from "@/components/form/label";
import { FormInput } from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ResetPasswordForm, resetPasswordSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
    },
  });

  useEffect(() => {
    return () => {
      setEmail(form.getValues("email"));
    };
  }, []);

  if (email) {
    return (
      <div className="flex-1 pt-[128px] pb-[422px]">
        <div className="space-y-8 max-w-[580px] w-full mx-auto">
          <div className="space-y-12">
            <div
              onClick={() => form.reset({ email: "" })}
              className="text-primary-500 text-sm flex items-center gap-x-2"
            >
              <ChevronLeft className="size-5" />
              Back
            </div>
            <div className="space-y-4">
              <h3 className="text-[28px] text-neutral-800 font-bold">
                Reset Method
              </h3>
              <p className="text-lg text-neutral-500">
                Select the reset method you want to use
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <Button
              onClick={() => router.push(`/security-questions?email=${email}`)}
              className="w-full h-fit p-4 text-base text-white font-semibold
    rounded-[56px] bg-primary-500"
            >
              security questions
            </Button>
            <Button
              onClick={() => router.push(`/reset-password-otp?email=${email}`)}
              className="w-full h-fit p-4 text-base text-white font-semibold
    rounded-[56px] bg-primary-500"
            >
              otp
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 pt-[128px] pb-[422px]">
      <div className="space-y-8 max-w-[580px] w-full mx-auto">
        <div className="space-y-12">
          <Link
            href="/sign-in"
            onClick={() => form.reset({ email: "" })}
            className="text-primary-500 text-sm flex items-center gap-x-2"
          >
            <ChevronLeft className="size-5" />
            Back
          </Link>
          <div className="space-y-4">
            <h3 className="text-[28px] text-neutral-800 font-bold">
              Forget Password
            </h3>
            <p className="text-lg text-neutral-500">
              Enter your email address to reset your password
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(({ email }) => {
              setEmail(email);
            })}
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel text="Email address" />
                  <FormInput placeholder="Type your email" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-6">
              <Button
                className="w-full h-fit p-4 text-base text-white font-semibold
        rounded-[56px] bg-primary-500"
              >
                Continue
              </Button>
              <div className="space-y-10">
                <Link
                  href="/sign-in"
                  className="flex item-center justify-center
              font-josefin font-semibold text-primary-500 text-base"
                >
                  Sign in back
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
