'use client';

import {
  UpdateProfileForm,
  updateProfileSchema,
} from '@/app/(pages)/(auth)/sign-up/schema';
import { FormInput } from '@/components/form/input';
import { FormLabel } from '@/components/form/label';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  preview?: boolean;
};

export const ProfileForm = (props: Props) => {
  const form = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
    disabled: props.preview,
  });

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h4 className="font-semibold text-xl">Profile Details</h4>
        <Separator className="bg-neutral-100" />
      </div>
      <Form {...form}>
        <form className="grid grid-cols-2 gap-x-6 gap-y-8">
          <FormField
            name="fullName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel text="Full name" />
                <FormInput {...field} placeholder="Type your full name" />
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
                <FormInput {...field} placeholder="dd/mm/yyyy" type="text" />
                <FormMessage />
              </FormItem>
            )}
          />

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
        </form>
      </Form>
    </div>
  );
};
