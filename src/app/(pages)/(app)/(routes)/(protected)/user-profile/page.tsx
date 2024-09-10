import { serverApi } from "@/features/server-api";
import { ProfileActionTab } from "./tab-meta";
import tryit from "@/lib/tryit";
import { getUser } from "@/features/query/get-user";
import { getJwt } from "@/auth";
import { redirect } from "next/navigation";
import {
  getResourcesByUsernameResSchema,
  getResourcesResSchema,
} from "@/lib/response";
import { BookPublicationContent } from "../../../__components/book-publication-content";

const BookPublications = async () => {
  const jwt = await getJwt();

  if (!jwt) {
    return redirect("/sign-in");
  }

  const [user, err] = await tryit(getUser(jwt));

  if (!(err === null && user)) {
    return redirect("/sign-in");
  }

  return (
    <div className="max-w-[855px] w-full bg-white rounded-[24px]">
      <div className="p-8 h-full">
        <div className="space-y-8">
          <h3 className="font-semibold text-[40px] leading-[54px] text-neutral-800">
            Profile
          </h3>
          <ProfileActionTab />
          {/*
             <BookPublicationContent username={user.userName} />
            */}
        </div>
      </div>
    </div>
  );
};

export default BookPublications;
