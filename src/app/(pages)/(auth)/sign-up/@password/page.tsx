'use client';

import { useEffect, useState } from 'react';
import { Stage, stageMeta, useSignUpContext } from '../provider';
import { SignUpForm } from '../schema';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FormLabel } from '@/components/form/label';
import { FormInput } from '@/components/form/input';
import { Button } from '@/components/ui/button';
import { FormPasswordInput } from '@/components/form/form-password-input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

export const stageTag: Stage = 'password';
const GetUserPassword = () => {
  const { form, stage, stageMeta, next } = useSignUpContext();
  const [fields] = useState(stageMeta[stageTag]?.fields);

  if (stageTag !== stage) {
    throw new Error(
      `Mismatch current internal stage "${stage}" to url stage "${stage}"`
    );
  }

  if (!form) {
    throw new Error('Sign up form context not set');
  }

  if (!fields) {
    throw new Error(`Missing fields for the ${stage} stage`);
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-[28px] text-neutral-800 font-bold">
          Enter Your Password
        </h3>
        <p className="text-lg text-neutral-400">
          Please ensure your password is more than 8 character
        </p>
      </div>

      <div className="space-y-6">
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel text="Password" />
              <FormPasswordInput placeholder="Type your password" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel text="Confirm password" />
              <FormPasswordInput
                placeholder="Retype your password"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-10">
          <div className="flex items-center gap-x-2 text-sm font-inter font-medium text-neutral-400">
            <Checkbox
              className="size-6 border-neutral-300 bg-white rounded-[2px]
                     border-[2px] p-0 data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-500 !ring-0 !ring-transparent "
            />
            Tapping on “Sign up” means you have agree to
            <Link href="" className="text-primary-500">
              Term of use
            </Link>
            and
            <Link href="" className="text-primary-500">
              Privacy policy
            </Link>
          </div>
          <Button
            onClick={() => next?.()}
            className="w-full h-fit p-4 text-base text-white font-semibold 
        rounded-[56px] bg-primary-500 !mt-10"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetUserPassword;
