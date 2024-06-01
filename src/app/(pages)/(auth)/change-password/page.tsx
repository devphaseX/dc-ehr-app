'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FormLabel } from '@/components/form/label';
import { Button } from '@/components/ui/button';
import { FormPasswordInput } from '@/components/form/form-password-input';

import { ChangePasswordForm, changePasswordSchema } from './schema';

const ChangePassword = () => {
  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const router = useRouter();

  const [resetCompleted, setResetCompleted] = useState(true);

  if (resetCompleted) {
    return (
      <div className="w-full h-full absolute inset-0">
        <div className="h-full w-full flex items-center justify-center">
          <div className="max-w-[580px] w-full text-center">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-neutral-800">
                Password Reset Successfully
              </h3>

              <p className="text-lg text-neutral-500">
                Welcome James, You can now share and download alot of free
                resources from your resources page
              </p>
            </div>
            <Button
              type="button"
              onClick={() => router.push('/sign-in')}
              className="w-full h-fit p-4 text-base text-white font-semibold 
      rounded-[56px] bg-primary-500 !mt-10"
            >
              Sign in back
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 flex items-center">
      <div className="space-y-10 max-w-[580px] w-full mx-auto">
        <div className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-[28px] text-neutral-800 font-bold">
              Reset Your Password
            </h3>
            <p className="text-lg text-neutral-400">
              You need to remember your security answer, You will be asked when
              you wan to reset your password
            </p>
          </div>

          <Form {...form}>
            <form>
              <div className="space-y-6">
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel text="Password" />
                      <FormPasswordInput
                        placeholder="Type your password"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel text="Confirm password" />
                      <FormPasswordInput
                        placeholder="Retype your password"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full h-fit p-4 text-base text-white font-semibold 
        rounded-[56px] bg-primary-500 !mt-10"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
