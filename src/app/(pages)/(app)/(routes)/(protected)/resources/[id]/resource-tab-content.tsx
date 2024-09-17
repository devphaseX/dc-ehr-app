import { parseAsStringEnum, useQueryState } from "nuqs";
import {
  ResourceFileCard,
  ResourceFileCardSkeleton,
} from "./resource-file-card";
import { useGetResourceFiles } from "@/features/api/query/use-resource-files";

export const ResourceTabContent = ({ resourceId }: { resourceId: string }) => {
  const [selectedTab, setSelectedTab] = useQueryState(
    "tab",
    parseAsStringEnum(["resources", "descriptions"]).withDefault(
      "descriptions",
    ),
  );

  const { data, isLoading } = useGetResourceFiles(resourceId);

  return (
    <div className="space-y-10">
      {isLoading && (
        <>
          <ResourceFileCardSkeleton />
        </>
      )}
      {data?.map((item) => <ResourceFileCard key={item.fileId} data={item} />)}
    </div>
  );
};
