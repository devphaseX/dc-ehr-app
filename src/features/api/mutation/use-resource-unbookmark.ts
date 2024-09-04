import { bookmarkResourceResSchema } from "@/lib/response";
import { useApi, useAuth } from "@/providers/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUnbookmarkResource = () => {
  const api = useApi();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const userId = user?.id;

      if (!userId) {
        throw new Error("failed to remove bookmark  on resource");
      }
      const { data, status } = await api.put(
        `/Resource/UnBookmarkResource?userId=${userId}&resourceId=${id}`,
        null,
        { validateResponse: (data) => bookmarkResourceResSchema.parse(data) },
      );
      if (!status) {
        throw new Error("failed to bookmark resource");
      }
      const payload = data!;
      if (payload.responseCode !== 200) {
        throw new Error(
          payload.responseMessage ?? "failed to bookmark resource",
        );
      }
      return payload.responseData;
    },
    onMutate: async (resourceId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["resources", resourceId] });

      // Snapshot the previous value
      const previousResource = queryClient.getQueryData([
        "resources",
        resourceId,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(["resources", resourceId], (old: any) => ({
        ...old,
        isBookmarked: true,
      }));

      // Return a context object with the snapshotted value
      return { previousResource };
    },
    onError: (err, newResource, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(
        ["resources", newResource],
        context?.previousResource,
      );
    },
    onSettled: (data, error, variables) => {
      // Always refetch after error or success to ensure we have the correct data
      queryClient.invalidateQueries({ queryKey: ["resources", variables] });
    },
  });
};
