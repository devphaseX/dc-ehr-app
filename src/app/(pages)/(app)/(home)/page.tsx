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
import { getJwt } from "@/auth";
import { serverGetCategories } from "@/features/query/get-categories";
import { getQueryClient } from "@/providers/query-client";

const Home = async () => {
  const jwt = await getJwt();
  const { data } = await serverGetCategories();

  if (data?.responseCode !== 200) {
    console.error("Categories data failed to fetch");
  }

  const categories = (data?.responseData! ?? []) as ContentCategory[];

  await getQueryClient().prefetchQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const { data } = await serverApi.get(`/Resource/GetAllResource`, {
        validateResponse: (data) => getResourcesResSchema.parse(data),
      });

      console.log({ data });

      if (!data) {
        throw new Error("An error occurred fetching resources");
      }

      if (data?.responseCode !== 200) {
        throw new Error(data?.responseMessage);
      }

      return data.responseData!;
    },
  });

  return (
    <>
      <Heroes />
      <ChooseCategory categories={categories} />
      <Contents />
      <QuickSignUp />
    </>
  );
};

export default Home;
