"use client";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormLabel } from "@/components/form/label";
import { FormInput } from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { FormPasswordInput } from "@/components/form/form-password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { SignInForm, signInSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { signInAction } from "@/actions/sign-in/handler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const { execute: signIn } = useAction(signInAction, {
    onSettled: ({ data }) => {
      if (data?.message) {
        toast.success(data?.message);
        router.push("/");
      } else {
        toast.error(data?.error ?? "failed to sign user in.");
      }
    },
  });

  return (
    <div className="w-full h-full flex items-center justify-center mt-[148px]">
      <div className="space-y-10 max-w-[580px] w-full mx-auto">
        <div className="space-y-3">
          <h3 className="text-[28px] text-neutral-800 font-bold">
            Sign Back To Your Account
          </h3>
          <p className="text-lg text-neutral-500">
            Enter your email address and password to continue to your account
          </p>
        </div>

        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit((data) => signIn(data))}
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
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel text="Password" />
                    <Link
                      href="/forget-password"
                      className="flex item-center justify-center
                      font-josefin font-semibold text-primary-500 text-sm"
                    >
                      Forget password
                    </Link>
                  </div>
                  <FormPasswordInput
                    placeholder="Type your password"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-6">
              <div className="space-y-8">
                <div
                  className="flex items-center gap-x-2 text-sm
                font-inter  text-neutral-900"
                >
                  <Checkbox
                    className="size-6 border-neutral-300 bg-white rounded-[2px]
                     border-[2px] p-0 data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-500 !ring-0 !ring-transparent "
                  />
                  Remember me next time
                </div>
                <Button
                  className="w-full h-fit p-4 text-base text-white font-semibold
                      rounded-[56px] bg-primary-500"
                >
                  Continue
                </Button>
              </div>
              <div className="flex items-center gap-x-2 text-sm font-inter font-medium text-neutral-400 justify-center">
                Signing in mean you have agree to the
                <Link href="" className="text-primary-500 text-sm">
                  Term of use
                </Link>
                and
                <Link href="" className="text-primary-500 text-sm">
                  Privacy policy
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
