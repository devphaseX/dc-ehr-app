import { getAuthorProfile } from "@/features/query/get-author-profile";
import { getResourcesByUsernameResSchema } from "@/lib/response";
import { redirect } from "next/navigation";
import { AuthorProfile } from "./profile";

const Info = async ({ params }: { params: { userName: string } }) => {
  const { userName } = params;

  const author = await getAuthorProfile(userName);

  return <AuthorProfile user={author} />;
};

export default Info;
