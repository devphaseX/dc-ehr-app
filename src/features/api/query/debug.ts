import { SearchResultsProps } from "@/app/(pages)/(app)/(routes)/(protected)/results/search-results";
import { getResourcesResSchema } from "@/lib/response";
import { useApi } from "@/providers/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export const useResourcesDebug = (query: SearchResultsProps["query"]) => {
  console.log({ query });
  const api = useApi();
  const queryClient = useQueryClient();
  const previousQueryRef = useRef(query);

  const result = useQuery({
    queryKey: ["resources-debug", query],
    queryFn: async () => {
      console.log("Fetching with query:", query);
      const { data } = await api.get(`/Resource/GetAllResource`, {
        params: query,
        validateResponse: (data) => getResourcesResSchema.parse(data),
      });
      if (!data || data.responseCode !== 200 || !data.responseData) {
        throw new Error(
          data?.responseMessage || "An error occurred fetching resources",
        );
      }
      return data.responseData;
    },
  });

  useEffect(() => {
    const queryChanged =
      JSON.stringify(query) !== JSON.stringify(previousQueryRef.current);
    console.log("Query changed:", queryChanged);
    console.log("Previous query:", previousQueryRef.current);
    console.log("Current query:", query);

    if (queryChanged) {
      console.log("Invalidating query");
      queryClient.invalidateQueries({ queryKey: ["resources-debug"] });
      previousQueryRef.current = query;
    }
  }, [query, queryClient]);

  return result;
};
