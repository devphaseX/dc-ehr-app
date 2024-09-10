import { ResourceContent } from "./resource-content";
import { getServerResource } from "@/features/query/get-resource";

const ResourcePage = async ({ params }: { params: { id: string } }) => {
  const resource = await getServerResource(params.id);
  return <ResourceContent resource={resource} />;
};

export default ResourcePage;
