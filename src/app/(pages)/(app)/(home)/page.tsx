import { ChooseCategory } from "./__components/category-section";
import { Heroes } from "./heroes";
import { Contents } from "./contents";
import { QuickSignUp } from "./quick-sign-up";
import { serverApi } from "@/features/server-api";
import { ContentCategory, getCategoriesResSchema } from "@/lib/response";
import { getJwt } from "@/auth";

const Home = async () => {
  const jwt = await getJwt();
  const { data, status } = await serverApi.get("/Category/GetCategories", {
    headers: jwt ? { Authorization: `bearer ${jwt}` } : undefined,
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
