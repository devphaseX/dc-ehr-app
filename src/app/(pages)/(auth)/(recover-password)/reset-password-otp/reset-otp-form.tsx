"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useQueryState, parseAsInteger } from "nuqs";
import { useEffect, useMemo } from "react";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { createVerifyOtpSchema } from "@/lib/schema/form";
import { MAX_OTP_FIELD_LENGTH } from "@/lib/constants/variables";
import { useVerifyPasswordOtp } from "@/features/api/mutation/use-verify-password-otp";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const VerifyResetPasswordOTPForm = () => {
  const [resetEmail] = useQueryState("email");
  const [otpFieldSize] = useQueryState(
    "field",
    parseAsInteger
      .withOptions({ throttleMs: 500 })
      .withDefault(MAX_OTP_FIELD_LENGTH),
  );

  const verifyUserSchema = useMemo(
    () => createVerifyOtpSchema(otpFieldSize),
    [otpFieldSize],
  );

  const router = useRouter();

  const { mutateAsync } = useVerifyPasswordOtp();

  const form = useForm<z.infer<typeof verifyUserSchema>>({
    resolver: zodResolver(verifyUserSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (!resetEmail) {
      router.push("/forget-password");
    }
  }, []);

  if (!resetEmail) return null;
  return (
    <div className="pt-20">
      <div className="h-full w-full flex items-center justify-center">
        <div className="max-w-[580px] w-full text-center space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async ({ otp }) => {
                const { message, error } = await mutateAsync({
                  otp,
                  email: resetEmail,
                });

                if (message) {
                  toast.success(message);
                  return router.push("/reset-password");
                }

                toast.error(error);
              })}
              className="flex flex-col space-y-6"
            >
              <div className="space-y-4 mb-8">
                <h3 className="text-[28px] text-neutral-800 font-bold">
                  Enter the OTP code send to your mail
                </h3>
                <p className="text-lg text-neutral-400">
                  You are to enter the otp sent to your mail box
                </p>
              </div>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <div className="max-w-[80%] mx-auto">
                          <InputOTP
                            maxLength={otpFieldSize}
                            value={field.value}
                            onChange={(value) => form.setValue("otp", value)}
                            containerClassName="flex justify-between w-full"
                          >
                            {Array.from({ length: otpFieldSize }, (_, i) => (
                              <InputOTPSlot
                                index={i}
                                className="w-12 h-14 border-[1.5px] !rounded-sm text-xl"
                              />
                            ))}
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button
                type="submit"
                disabled={form.formState.disabled}
                className="w-full h-fit p-4 text-base text-white font-semibold
rounded-[56px] bg-primary-500 !mt-8"
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
