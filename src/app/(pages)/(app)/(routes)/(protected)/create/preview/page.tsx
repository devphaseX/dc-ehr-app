"use client";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormTextarea } from "@/components/form/text-area";
import { Resource, useNewResourceStore } from "../form-state";
import { toast } from "sonner";
import { useGetCategories } from "@/features/api/query/use-get-categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { ulid } from "ulid";
import { useRouter } from "next/navigation";
import { useCreateResource } from "@/features/api/mutation/use-create-resource";

const PreviewNewResourcePage = () => {
  let { setPost, post } = useNewResourceStore();
  const { data: categories } = useGetCategories();
  const router = useRouter();

  const { mutate: createResource, isPending, error } = useCreateResource();

  useEffect(() => {
    if (!post) {
      router.push("/create/new");
    }
  }, [post]);

  if (!post) return null;

  return (
    <div className="bg-neutral-50 min-h-full pt-14 pb-[445px]">
      <Container>
        <div>
          <Button
            onClick={() => {
              router.back();
            }}
            className="text-primary-500 text-sm flex items-center gap-x-2 mb-8"
          >
            <ChevronLeft className="size-5" />
            Back
          </Button>

          <div className="bg-white rounded-[12px] p-[48px]">
            <div className="max-w-[789px] w-full mx-auto space-y-[48px]">
              <div>
                <h4 className="text-[40px] leading-[54px] text-neutral-800">
                  Preview
                </h4>
              </div>

              <div className="space-y-8">
                <div className="space-y-5">
                  <div className="flex gap-x-6">
                    <p className="text-xs text-neutral-400 font-semibold ">
                      Subject:{" "}
                      <span className="text-neutral-700"> {post.subject}</span>
                    </p>
                    <p className="text-xs text-neutral-400 font-semibold ">
                      Level:{" "}
                      <span className="text-neutral-700">
                        {
                          (categories ?? []).find(
                            (category) => category.id === post.category,
                          )?.name
                        }
                      </span>
                    </p>
                  </div>

                  <div className="flex items-start gap-x-2">
                    <div>Resource Tags: </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {post.tags.map(({ id, tag }) => (
                        <span
                          key={id}
                          className="block px-3 py-[6px] rounded-[36px]
                          text-primary-500 border border-primary-500 font-medium text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Separator className="bg-neutral-100" />
              </div>

              <div className="space-y-6">
                <h5 className="text-lg text-neutral-700 font-semibold">
                  Descriptions
                </h5>
                <p className="text-sm text-neutral-500">{post.description}</p>
                <Separator className="bg-neutral-100" />
              </div>

              <div className="flex items-center justify-end gap-x-6 mt-8">
                <div className="flex items-center gap-x-2">
                  <Button
                    disabled={isPending}
                    onClick={() => router.push("/create/new")}
                    className="flex items-center justify-center px-8 py-4
                     rounded-[48px] bg-primary-50 text-primary-500 font-semibold text-base font-josefin w-fit h-fit"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isPending}
                    onClick={() => {
                      createResource(post, {
                        onSuccess: (resourceId) => {
                          toast.success("resource sucesssfully uploaded");
                          router.push(
                            `/create/completed?resourceId=${resourceId}`,
                          );
                        },

                        onError: () => {
                          toast.success("failed to upload resource");
                        },
                      });
                    }}
                    className="flex items-center justify-center px-8 py-4
                        rounded-[48px] bg-primary-500 text-white font-semibold text-base font-josefin w-fit h-fit"
                  >
                    Upload Resource
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PreviewNewResourcePage;
