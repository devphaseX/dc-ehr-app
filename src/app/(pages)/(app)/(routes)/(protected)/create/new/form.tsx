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

import { ChevronLeft, LucideBatteryWarning, X } from "lucide-react";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import { NewResource, createNewResourceSchema, FileItem } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormTextarea } from "@/components/form/text-area";
import { useNewResourceStore } from "../form-state";
import { toast } from "sonner";
import { FileTray } from "./file-tray";
import { useGetCategories } from "@/features/api/query/use-get-categories";
import { useGetSubjects } from "@/features/api/query/use-get-subjects";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { ulid } from "ulid";
import { useRouter, useSearchParams } from "next/navigation";

export const NewResourceForm = () => {
  const { data: categories } = useGetCategories();
  // const { data: subjectsPayload } = useGetSubjects();
  const { resourceId } = Object.fromEntries(useSearchParams()) as {
    resourceId: string;
  };

  // const subjects = Array.from(new Set(subjectsPayload));
  const form = useForm<NewResource & { tag?: string }>({
    resolver: zodResolver(
      createNewResourceSchema.extend({
        tag: z.string().min(3).optional(),
      }),
    ),
    defaultValues: { fileName: "", files: [], tags: [] },
  });

  const router = useRouter();

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const selectedFiles = (form.watch("files") ?? []) as FileItem[];

  const setSelectFiles: Dispatch<SetStateAction<FileItem[]>> = (value) => {
    let nextState: FileItem[];
    if (typeof value === "function") {
      nextState = value((form.getValues("files") as FileItem[]) ?? []);
    } else {
      nextState = value;
    }

    form.setValue("files", nextState);
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
                <FileTray
                  selectedFiles={selectedFiles}
                  setSelectFiles={setSelectFiles}
                />
              </div>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((formValues) => {
                      let files = (formValues.files as Array<FileItem>)
                        .map(({ fileUrl }) => fileUrl)
                        .filter((url): url is string => url != null);

                      const imageNotFullyResolved =
                        formValues.files.length != files.length;

                      if (imageNotFullyResolved) {
                        toast.error("Images still uploading");
                        return;
                      }

                      if (!files.length) {
                        toast.error("Atleast one file needs to be selected.");
                        return;
                      }

                      setPost({
                        ...(formValues as any),
                        ...(resourceId && { ResourceId: resourceId }),
                      });
                      router.push("/create/preview");
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
                                placeholder="Type your Subject"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="tag"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel text="Tags" />
                              <FormInput
                                {...field}
                                placeholder="Type your tags here"
                                onKeyDown={async (ev) => {
                                  const valid = await form.trigger("tag");

                                  const enterKeyPressed =
                                    ev.key.toLowerCase() === "enter";

                                  if (enterKeyPressed) {
                                    ev.preventDefault();
                                    ev.stopPropagation();
                                  }

                                  if (enterKeyPressed && valid) {
                                    appendTag({
                                      id: ulid(),
                                      tag: field.value!,
                                    });

                                    form.setValue("tag", undefined);
                                  }
                                }}
                              />

                              <div className="flex gap-3 flex-wrap">
                                {tagFields.map(({ id, tag }, index) => (
                                  <Button
                                    key={id}
                                    variant="ghost"
                                    type="button"
                                    className="flex justify-center items-center gap-x-2
                                                                text-primary-brand bg-[#F8F8FD] p-2 pl-3 h-fit w-fit rounded-none"
                                    onClick={() => {
                                      form.setValue("tag", tag);
                                      removeTag(index);
                                    }}
                                  >
                                    {tag}
                                    <span
                                      onClick={(ev) => {
                                        removeTag(index);
                                        ev.stopPropagation();
                                      }}
                                    >
                                      <X className="w-4 h-4" />
                                    </span>
                                  </Button>
                                ))}
                              </div>
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
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger
                                  id="area"
                                  className={`py-4 px-6 w-full h-fit  text-base text-neutral-900
                                placeholder:text-neutral-300 bg-[#FAFBFB] rounded-[8px] border-none !ring-0 !ring-offset-0 !ring-transparent`}
                                >
                                  <SelectValue placeholder="Select your education categories" />
                                </SelectTrigger>
                                <SelectContent>
                                  {(categories ?? []).map((category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
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
