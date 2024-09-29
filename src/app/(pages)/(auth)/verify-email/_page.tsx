import { verifyEmailAction } from "@/actions/verify-email/handler";
import { Button } from "@/components/ui/button";
import { getUser } from "@/features/query/get-user";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

const CompleteAccountPage = async ({
  searchParams: { token, userId },
}: {
  searchParams: { token: string; userId: string };
}) => {
  // if (!(token && userId)) {
  //   return redirect("/");
  // }

  let user = await getUser();

  // if (user && user.isVerified) {
  //   return redirect("/");
  // }

  const result = await verifyEmailAction({ userId, token });

  if (result?.error) {
    return redirect(`/sign-in?error=${result?.error}`);
  }

  user = result.user!;

  return (
    <div className="w-full h-full absolute inset-0">
      <div className="h-full w-full flex items-center justify-center">
        <div className="max-w-[580px] w-full text-center">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-neutral-800">
              Account verified successfully
            </h3>

            <p className="text-lg text-neutral-500">
              Welcome {user.firstName}, You can now share and download alot of
              free resources from your resources page
            </p>
          </div>
          <Link
            href="/sign-in"
            className="w-full h-fit p-4 text-base text-white font-semibold
        rounded-[56px] bg-primary-500 !mt-10"
          >
            Go to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompleteAccountPage;
