'use client';

import { Container } from '@/components/container';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeOf, z } from 'zod';
import { FormLabel } from '@/components/form/label';
import { FormInput } from '@/components/form/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  fullName: z
    .string({ required_error: 'fullName is required' })
    .min(3, 'fullName must contain at least 3 characters'),
  username: z
    .string({ required_error: 'username is required' })
    .min(1, 'username must contain at least 1 character'),
  email: z
    .string({ required_error: 'email is equired' })
    .email('email is not valid'),
});

type MiniSignUpForm = TypeOf<typeof schema>;

export const QuickSignUp = () => {
  const form = useForm<MiniSignUpForm>({
    resolver: zodResolver(schema),
  });

  return (
    <section className="w-full bg-primary-500 pt-[96px] pb-[80px]">
      <Container>
        <div className="w-full flex items-start gap-x-[140px]">
          <div className="max-w-[480px] w-full space-y-4">
            <h3 className="text-white text-5xl font-semibold leading-[64px]">
              Create Your Hub Account Easily In Simple Steps{' '}
            </h3>
            <p className="text-white text-2xl">
              Create your account in few minutes
            </p>
          </div>

          <div className="max-w-[580px] w-full">
            <Card className="shadow-none p-10 rounded-[24px]">
              <CardContent className="p-0">
                <Form {...form}>
                  <form className="space-y-6">
                    <FormField
                      name="fullName"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel text="Full name" />
                          <FormInput
                            {...field}
                            placeholder="Type your full name"
                          />
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
                          <FormInput
                            {...field}
                            placeholder="Type your username"
                          />
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
                    <Button
                      type="button"
                      className="w-full h-fit p-4 text-base text-white font-semibold 
        rounded-[56px] bg-primary-500 !mt-10"
                    >
                      Continue
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};
