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

import { z } from "zod";
import { ulid } from "ulid";
import { redirect, useRouter } from "next/navigation";
import { useCreateResource } from "@/features/api/mutation/use-create-resource";
import { serverApi } from "@/features/server-api";
import { getResourceResSchema } from "@/lib/response";
import { ResourceCard } from "@/components/resource-card";
import { addMinutes, isWithinInterval } from "date-fns";
import { getUser } from "@/features/query/get-user";

const CompleteResourcePage = async ({
  searchParams,
}: {
  searchParams: { resourceId: string };
}) => {
  if (!searchParams.resourceId) {
    return redirect("/");
  }

  const user = await getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data } = await serverApi.get(
    `/Resource/GetResource/${searchParams.resourceId}`,
    {
      validateResponse: (data) => getResourceResSchema.parse(data),
    },
  );

  if (!data) {
    throw new Error("failed to fetch");
  }

  if (data.responseCode !== 200) {
    throw new Error("failed to fetch");
  }

  const resource = data.responseData!;

  const resourceUrl = `/resources/${resource.id}`;
  if (
    !isWithinInterval(resource.createdAt, {
      start: resource.createdAt,
      end: addMinutes(Date.now(), 10),
    })
  ) {
    return redirect(resourceUrl);
  }

  return (
    <div className="bg-neutral-50 min-h-full pt-14 pb-[445px]">
      <Container>
        <div>
          <div className="bg-white rounded-[12px] p-[48px]">
            <div className="max-w-[789px] w-full mx-auto space-y-16">
              <div className="max-w-[360px] max-auto">
                <ResourceCard
                  item={{
                    title: resource.fileName,
                    education: {
                      level: resource.category,
                      grade: resource.category,
                    },
                    resourceUrl,
                    topicSampleTitle: resource.description
                      .split(/\s+/, 20)
                      .join(" "),
                  }}
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-[28px] leading-[37.8px] text-neutral-800">
                  Resource Upload Successful
                </h3>
                <div className="space-y-8">
                  <p>{`Your ${user.firstName} resource has successfully been published.`}</p>
                  <Link href={resourceUrl}>
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-8 py-4
                  rounded-[48px] bg-primary-500 text-white font-semibold text-base font-josefin full h-fit"
                    >
                      view resource
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CompleteResourcePage;
