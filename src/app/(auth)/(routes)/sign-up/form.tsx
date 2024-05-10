'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { SignUpFormData, signUpSchema } from '@/actions/sign-up/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { useState } from 'react';

export default function SignUpForm() {
  const form = useForm<SignUpFormData>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '' },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full h-full relative">
      <div className="absolute right-0 top-0 flex gap-x-2 items-center">
        <p className="text-neutral-500 font-medium text-base">
          Already a user?
        </p>
        <Button
          variant="link"
          className="text-primary-500 font-bold text-base p-0 h-fit w-fit"
        >
          Sign in
        </Button>
      </div>
      <div className="space-y-6">
        <div className="w-full space-y-4 pt-24">
          <h5 className="text-4xl font-bold">Register an account</h5>
          <p className="font-medium text-neutral-500">
            Enter your detail to continue using app
          </p>
        </div>

        <div className="w-full">
          <Form {...form}>
            <form className="space-y-6">
              <FormItem className="flex space-y-0 flex-row  gap-x-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-base font-medium text-neutral-800 mb-3">
                        First Name
                      </FormLabel>
                      <FormControl {...field}>
                        <Input
                          type="text"
                          className="h-[56px] bg-neutral-50 border-none rounded-[8px] 
                    px-6 py-4 placeholder:text-neutral-300 text-base"
                          placeholder="John"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-base font-medium text-neutral-800 mb-3">
                        Last Name
                      </FormLabel>
                      <FormControl {...field}>
                        <Input
                          type="text"
                          className="h-[56px] bg-neutral-50 border-none rounded-[8px] 
                    px-6 py-4 placeholder:text-neutral-300 text-base"
                          placeholder="Doe"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </FormItem>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-neutral-800 mb-3">
                      Email address
                    </FormLabel>
                    <div className="relative">
                      <FormControl {...field}>
                        <Input
                          type="email"
                          className="h-[56px] bg-neutral-50 border-none rounded-[8px] 
                    px-6 py-4 placeholder:text-neutral-300 text-base pr-11"
                          placeholder="yourmail@domain.com"
                        />
                      </FormControl>
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 right-[14px] top-[50%] -translate-y-[50%]">
                        <Image
                          src="/icons/sms.svg"
                          alt="icon"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-neutral-800 mb-3">
                      Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl {...field}>
                        <Input
                          type="password"
                          className="h-[56px] bg-neutral-50 border-none rounded-[8px] 
                    px-6 py-4 placeholder:text-neutral-300 text-base pr-11"
                          placeholder="Min 8. character"
                        />
                      </FormControl>
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 right-[14px] top-[50%] -translate-y-[50%]">
                        <Image
                          src="/icons/eye.svg"
                          alt="icon"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-neutral-800 mb-3">
                      Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl {...field}>
                        <Input
                          type="password"
                          className="h-[56px] bg-neutral-50 border-none rounded-[8px] 
                    px-6 py-4 placeholder:text-neutral-300 text-base pr-11"
                          placeholder="Min 8. character"
                        />
                      </FormControl>
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 right-[14px] top-[50%] -translate-y-[50%]">
                        <Image
                          src="/icons/eye.svg"
                          alt="icon"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <div className="space-y-5">
                <FormItem className="flex items-center gap-x-3 space-y-0">
                  <Checkbox
                    className="w-5 h-5 border-[2px] rounded-none border-neutral-300
                 data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500"
                  />
                  <FormLabel className="mt-0  text-neutral-600 text-base font-medium">
                    Registering means that you have agreed to{' '}
                    <Button
                      variant="link"
                      className="text-primary-500 font-medium  p-0 h-fit w-fit underline
                     decoration-primary-500 decoration-[1.2px] text-base"
                    >
                      Terms of use
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-x-3 space-y-0">
                  <Checkbox className="w-5 h-5 border-[2px] rounded-none border-neutral-300 data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500" />
                  <FormLabel className="mt-0  text-neutral-600 text-base font-medium">
                    Send me update on available resources
                  </FormLabel>
                </FormItem>
              </div>

              <Button
                className="bg-primary-500 w-full py-5 
            rounded-[8px] text-white font-bold text-base hover:text-primary-50/80 !mt-[48px] h-14"
              >
                Register
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
