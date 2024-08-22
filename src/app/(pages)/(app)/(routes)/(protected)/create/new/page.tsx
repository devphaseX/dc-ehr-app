import { serverGetCategories } from "@/features/query/get-categories";
import { serverGetSubjects } from "@/features/query/get-subjects";
import { NewResourceForm } from "./form";
import { getQueryClient } from "@/providers/query-client";

export default async function CreateNewResourcePage() {
  await Promise.all([
    getQueryClient().prefetchQuery({
      queryKey: ["resource-categories"],
      queryFn: serverGetCategories,
    }),
    getQueryClient().prefetchQuery({
      queryKey: ["resource-subjects"],
      queryFn: serverGetSubjects,
    }),
  ]);

  return <NewResourceForm />;
}
