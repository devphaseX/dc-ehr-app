import { BookPublicationContent } from "@/app/(pages)/(app)/__components/book-publication-content";
import { ProfileActionTab } from "./tab-meta";
import { getAuthorProfile } from "@/features/query/get-author-profile";
import { redirect } from "next/navigation";

const BookPublications = async ({
  params,
}: {
  params: { userName: string };
}) => {
  const { userName } = params;
  const author = await getAuthorProfile(userName);
  if (!author) {
    return redirect("/");
  }
  return (
    <div className="max-w-[855px] w-full bg-white rounded-[24px] min-h-full">
      <div className="p-8 h-full">
        <div className="space-y-8">
          <h3 className="font-semibold text-[40px] leading-[54px] text-neutral-800">
            Profile
          </h3>
          <ProfileActionTab userId={author.id} />
          <BookPublicationContent username={userName} />
        </div>
      </div>
    </div>
  );
};

export default BookPublications;
