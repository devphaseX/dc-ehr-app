import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchResults, { ResultsSkeleton } from "./search-results";
import { Container } from "@/components/container";
import { ChevronLeft } from "lucide-react";
import { ContentFilters } from "../../../__components/content-filters";
import { serverGetCategories } from "@/features/query/get-categories";
import { ContentCategory } from "@/lib/response";
import { createServerQuery } from "./schema";
import ErrorBoundary, {
  DefaultErrorComponent,
} from "@/components/error-boundary";

export default async function Results({
  searchParams,
}: {
  searchParams: { q: string; categeory: string };
}) {
  const { data } = await serverGetCategories();
  const categories = (data?.responseData! ?? []) as ContentCategory[];

  const serverQuery = createServerQuery(searchParams);
  return (
    <div className="bg-white pt-14 pb-[111px] min-h-full">
      <Container>
        <Link
          href="/security-questions"
          className="text-primary-500 text-sm flex items-center gap-x-2 mb-12"
        >
          <ChevronLeft className="size-5" />
          Back
        </Link>
        <div className="space-y-8">
          {serverQuery.title && (
            <h3 className="text-2xl font-semibold">{serverQuery.title}</h3>
          )}
          <ErrorBoundary fallback={DefaultErrorComponent}>
            <Suspense fallback={<ResultsSkeleton />}>
              <SearchResults query={serverQuery} categories={categories} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </Container>
    </div>
  );
}
