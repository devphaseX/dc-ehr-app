import { ChooseCategory } from "./__components/category-section";
import { Heroes } from "./heroes";
import { Contents } from "./contents";
import { QuickSignUp } from "./quick-sign-up";
import { serverApi } from "@/features/server-api";
import {
  ContentCategory,
  getCategoriesResSchema,
  getResourcesResSchema,
} from "@/lib/response";
import { serverGetCategories } from "@/features/query/get-categories";
import { Suspense } from "react";
import SearchResults, {
  ResultsSkeleton,
} from "../(routes)/(protected)/results/search-results";
import { createServerQuery } from "../(routes)/(protected)/results/schema";
import { Container } from "@/components/container";
import ErrorBoundary, {
  DefaultErrorComponent,
} from "@/components/error-boundary";

const Home = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const { data } = await serverGetCategories();
  const categories = (data?.responseData! ?? []) as ContentCategory[];
  const serverQuery = createServerQuery(searchParams);
  console.log({ serverQuery });
  return (
    <>
      <Heroes />
      <ChooseCategory categories={categories} />
      <Container className="mb-16">
        <ErrorBoundary fallback={DefaultErrorComponent}>
          <Suspense fallback={<ResultsSkeleton />}>
            <SearchResults query={serverQuery} categories={categories} />
          </Suspense>
        </ErrorBoundary>
      </Container>
      <QuickSignUp />
    </>
  );
};

export default Home;
