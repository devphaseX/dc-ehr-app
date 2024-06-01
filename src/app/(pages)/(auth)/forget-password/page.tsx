'use client';

import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FormLabel } from '@/components/form/label';
import { FormInput } from '@/components/form/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { ResetPasswordForm, resetPasswordSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const ResetPassword = () => {
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <div className="flex-1 flex items-center">
      <div className="space-y-10 max-w-[580px] w-full mx-auto">
        <div className="space-y-4">
          <h3 className="text-[28px] text-neutral-800 font-bold">
            Forget Password
          </h3>
          <p className="text-lg text-neutral-400">
            Enter your email address to reset your password
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-10">
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
              font-josefin font-semibold text-primary-500 text-sm"
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
