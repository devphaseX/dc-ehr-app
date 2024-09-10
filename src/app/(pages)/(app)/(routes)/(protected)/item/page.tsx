"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
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

import { ChevronLeft, LucideBatteryWarning, Plus, Star, X } from "lucide-react";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormTextarea } from "@/components/form/text-area";
import { toast } from "sonner";
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
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ResourceActionTab } from "./tab-meta";
import { ResourceTabContent } from "./resource-tab-content";

const ResourcePage = () => {
  const tags = ["Robotics", "Basic Electronics", "Artificial Intelligent"];

  const metas: { title: string; content: string }[] = [
    { title: "Uploaded date", content: "Jan 23, 2024" },
    { title: "Uploaded date", content: "Jan 23, 2024" },
    { title: "Subject", content: "Mathematics" },
    { title: "Level", content: "Secondary" },
  ];
  return (
    <div className="bg-white min-h-full p-8 rounded-xl">
      <div>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-neutral-800">
              The Best Online Resoruce Library Hub
            </h3>
            <p className="text-sm text-neutral-500">
              by{" "}
              <span className="font-semibold text-neutral-800">Adam James</span>
            </p>
          </div>

          <div>
            <div className="h-[486px] w-full bg-neutral-50"></div>
          </div>

          <div className="space-y-7">
            <div className="flex items-center gap-x-4">
              <p>Resources Tags</p>
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag, i) => (
                  <div
                    className="inline-flex px-4 py-[6px] text-primary-500
                    border border-primary-500 text-xs font-medium rounded-[36px]"
                    key={i}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-x-1">
              <div className="flex items-baseline gap-x-1">
                <Star className="size-4 text-primary-500" />
                <Star className="size-4 text-primary-500" />
                <Star className="size-4 text-primary-500" />
                <Star className="size-4 text-primary-500" />
                <Star className="size-4 text-primary-500" />
              </div>
              <p className="text-sm font-semibold text-neutral-700 ">
                4.5 (Ratings)
              </p>
            </div>

            <div className="flex [&>*]:flex-1">
              {metas.map((meta, i) => (
                <div
                  key={i}
                  className={cn(
                    "space-y-2",
                    i !== 0 && "px-6",
                    i !== metas.length - 1 &&
                      "border-r-[1px] border-neutral-100",
                  )}
                >
                  <p className="text-neutral-400 text-[10px] leading-[16px]">
                    {meta.title}
                  </p>
                  <p className="font-semibold text-neutral-700 text-sm">
                    {meta.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-x-4">
              <Button
                className="px-4 py-[10px] rounded-[36px]
              border border-neutral-200 text-primary-500 font-medium text-sm bg-transparent"
              >
                <Plus className="size-5 mr-2" />
                New upload
              </Button>

              <Button
                className="px-4 py-[10px] rounded-[36px]
                border border-neutral-200 text-primary-500 font-medium text-sm bg-transparent"
              >
                <Star className="size-5 mr-2" />
                Rate Resource
              </Button>
            </div>
          </div>

          <div>
            <ResourceActionTab />
            <ResourceTabContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
