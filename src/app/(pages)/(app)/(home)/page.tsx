import { ChooseCategory } from "./__components/category-section";
import { Heroes } from "./heroes";
import { Contents } from "./contents";
import { QuickSignUp } from "./quick-sign-up";
import { serverApi } from "@/features/server-api";
import { ContentCategory, getCategoriesResSchema } from "@/lib/response";

const Home = async () => {
  const { data, status } = await serverApi.get("/Category/GetCategories", {
    validateResponse: (data) => getCategoriesResSchema.parse(data),
  });

  if (data?.responseCode !== 200) {
    console.error("Categories data failed to fetch");
  }

  const categories = (data?.responseData! ?? []) as ContentCategory[];

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
