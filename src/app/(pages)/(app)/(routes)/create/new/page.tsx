"use client";
import { useState, Dispatch, SetStateAction } from "react";
import { Container } from "@/components/container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormInput } from "@/components/form/input";
import { FormLabel } from "@/components/form/label";

import { ChevronLeft, LucideBatteryWarning } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CreateNewResource, createNewResourceSchema, FileItem } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormTextarea } from "@/components/form/text-area";
import { ImageTray } from "./image-tray";
import { useNewResourceStore } from "../form-state";
import { toast } from "sonner";

const NewResource = () => {
  const form = useForm<CreateNewResource>({
    resolver: zodResolver(createNewResourceSchema),
    defaultValues: { images: [] },
  });

  const selectedFiles = (form.watch("images") ?? []) as FileItem[];

  const setSelectFiles: Dispatch<SetStateAction<FileItem[]>> = (value) => {
    let nextState: FileItem[];
    if (typeof value === "function") {
      nextState = value((form.getValues("images") as FileItem[]) ?? []);
    } else {
      nextState = value;
    }

    form.setValue("images", nextState);
  };

  const { setPost } = useNewResourceStore();
  return (
    <div className="bg-neutral-50 min-h-full pt-14 pb-[445px]">
      <Container>
        <div>
          <Link
            href="/security-questions"
            className="text-primary-500 text-sm flex items-center gap-x-2 mb-8"
          >
            <ChevronLeft className="size-5" />
            Back
          </Link>

          <div className="bg-white rounded-[12px] p-[48px]">
            <div className="max-w-[789px] w-full mx-auto space-y-[48px]">
              <div className="space-y-[48px]">
                <h4 className="text-[40px] leading-[54px] text-neutral-800">
                  Upload File
                </h4>
                <ImageTray
                  selectedFiles={selectedFiles}
                  setSelectFiles={setSelectFiles}
                />
              </div>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((formValues) => {
                      const images = selectedFiles.map(
                        (files) => files.fileUrl,
                      );

                      // if (!images.length) {
                      //   toast.error(
                      //   );
                      //   return;
                      // }

                      // setPost({ ...formValues, images: })
                    })}
                  >
                    <div className="space-y-14">
                      <div className="space-y-8">
                        <div className="space-y-6">
                          <h3 className="text-xl font-bold text-neutral-800">
                            Basic Information
                          </h3>
                          <Separator className="bg-neutral-100" />
                        </div>

                        <FormField
                          name="fileName"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel text="File name" />
                              <FormInput
                                {...field}
                                placeholder="Type your filename"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="subject"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel text="Subject" />
                              <FormInput
                                {...field}
                                placeholder="Select your subjects"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="tags"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel text="Tags" />
                              <FormInput
                                {...field}
                                placeholder="Type your tags here"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="category"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel text="Category" />
                              <FormInput
                                {...field}
                                placeholder="Select your education categories"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-8">
                        <div className="space-y-6">
                          <h3 className="text-xl font-bold text-neutral-800">
                            Additional Information
                          </h3>
                          <Separator className="bg-neutral-100" />
                        </div>

                        <FormField
                          name="description"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel text="File descripitions" />
                              <FormTextarea
                                {...field}
                                className="h-[240px] resize-none"
                                placeholder="Type your text here"
                              />

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          name="licenses"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel text="Licenses" />
                              <FormInput
                                {...field}
                                placeholder="Select your education categories"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="mt-8 space-y-8">
                      <Separator className="bg-neutral-100" />

                      <div className="flex items-center justify-end gap-x-6">
                        <div className="flex items-center gap-x-2">
                          <Button
                            className="flex items-center justify-center px-8 py-4
                 rounded-[48px] bg-primary-50 text-primary-500 font-semibold text-base font-josefin w-fit h-fit"
                          >
                            Save to draft
                          </Button>
                          <Button
                            type="submit"
                            className="flex items-center justify-center px-8 py-4
                rounded-[48px] bg-primary-500 text-white font-semibold text-base font-josefin w-fit h-fit"
                          >
                            Preview Resources
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NewResource;
