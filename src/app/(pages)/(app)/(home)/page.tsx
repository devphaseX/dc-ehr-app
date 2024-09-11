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

const Home = async () => {
  const { data } = await serverGetCategories();
  const categories = (data?.responseData! ?? []) as ContentCategory[];
  return (
    <>
      <Heroes />
      <ChooseCategory categories={categories} />
      <Contents categories={categories} />
      <QuickSignUp />
    </>
  );
};

export default Home;
