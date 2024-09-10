import { BookPublicationContent } from "@/app/(pages)/(app)/__components/book-publication-content";
import { ProfileActionTab } from "./tab-meta";
import { getAuthorProfile } from "@/features/query/get-author-profile";

const BookPublications = async ({
  params,
}: {
  params: { userName: string };
}) => {
  const { userName } = params;
  const author = await getAuthorProfile(userName);

  return (
    <div className="max-w-[855px] w-full bg-white rounded-[24px] absolute inset-0">
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
