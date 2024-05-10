'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/actions/sign-in/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { SignUpFormData } from '@/actions/sign-up/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

export default function SignInForm() {
  const form = useForm<SignUpFormData>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <div className="w-full h-full relative">
      <div className="absolute right-0 top-0 flex gap-x-2 items-center">
        <p className="text-neutral-500 font-medium text-base">
          Don’t have any account yet?
        </p>
        <Button
          variant="link"
          className="text-primary-500 font-bold text-base p-0 h-fit w-fit"
        >
          Sign up
        </Button>
      </div>
      <div className="space-y-6 h-full flex flex-col justify-center">
        <div className="w-full space-y-4 pt-24">
          <h5 className="text-4xl font-bold">Sign in</h5>
          <p className="font-medium text-neutral-500">
            Welcome back, sign in to continue with app
          </p>
        </div>

        <div className="w-full">
          <Form {...form}>
            <form className="space-y-6">
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
              <div className="space-y-5">
                <FormItem className="flex items-center gap-x-3 space-y-0">
                  <Checkbox className="w-5 h-5 border-[2px] rounded-none border-neutral-300 data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500" />
                  <FormLabel className="mt-0 font-medium text-neutral-900 text-base">
                    Keep me sign in on this device
                  </FormLabel>
                </FormItem>
              </div>

              <div className="flex flex-col items-center !mt-0 gap-y-8">
                <Button
                  className="bg-primary-500 w-full py-4
            rounded-[10px] text-white font-bold text-lg hover:text-primary-50/80 !mt-8 h-14"
                >
                  Sign in
                </Button>
                <div className="mt-0 font-medium text-neutral-600 text-base">
                  Trouble signing in?{' '}
                  <Button
                    variant="link"
                    className="text-primary-500  p-0 w-fit h-fit text-base font-bold"
                  >
                    Reset password
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
