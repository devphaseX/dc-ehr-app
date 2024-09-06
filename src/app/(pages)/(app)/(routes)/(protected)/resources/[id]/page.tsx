import { ContentFilters } from "@/app/(pages)/(app)/__components/content-filters";
import { Container } from "@/components/container";
import { serverGetCategories } from "@/features/query/get-categories";
import { getServerResource } from "@/features/query/get-resource";
import { getServerResourceFiles } from "@/features/query/get-resource-files";
import { ContentCategory } from "@/lib/response";
import tryit from "@/lib/tryit";
import { getQueryClient } from "@/providers/query-client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Contents } from "./content";

export default async function ResourcePage({
  params,
}: {
  params: { id: string };
}) {
  console.log("-------------------");
  console.log("working");
  const [resp, err] = await tryit(getServerResource(params.id));

  console.log({ resp, err });
  if (err) {
    throw err;
  }

  const { data } = await serverGetCategories();

  if (data?.responseCode !== 200) {
    console.error("Categories data failed to fetch");
  }

  const categories = (data?.responseData ?? []) as Array<ContentCategory>;

  await getQueryClient().prefetchQuery({
    queryKey: ["resources-files", resp.id],
    queryFn: () => getServerResourceFiles(params.id),
  });

  return (
    <div className="min-h-full pt-14 pb-[445px]">
      <Container>
        <div>
          <Link
            href="/security-questions"
            className="text-primary-500 text-sm flex items-center gap-x-2 mb-8"
          >
            <ChevronLeft className="size-5" />
            Back
          </Link>

          <div className="w-full space-y-[48px]">
            <div className="space-y-[48px]">
              <h4 className="text-[40px] leading-[54px] text-neutral-800">
                {resp.fileName}
              </h4>
              <ContentFilters categories={categories} />

              <Contents id={params.id} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
