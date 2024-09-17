import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchResults, { ResultsSkeleton } from "./search-results";
import { Container } from "@/components/container";
import { ChevronLeft } from "lucide-react";
import { ContentFilters } from "../../../__components/content-filters";
import { serverGetCategories } from "@/features/query/get-categories";
import { ContentCategory } from "@/lib/response";

export default async function Results({
  searchParams,
}: {
  searchParams: { q: string; categeory: string };
}) {
  const query = searchParams.q;

  const { data } = await serverGetCategories();
  const categories = (data?.responseData! ?? []) as ContentCategory[];
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
          <h3 className="text-2xl font-semibold">{query}</h3>
          <Suspense fallback={<ResultsSkeleton />}>
            <SearchResults
              query={query}
              pageNumber={1}
              pageSize={10}
              categories={categories}
            />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
