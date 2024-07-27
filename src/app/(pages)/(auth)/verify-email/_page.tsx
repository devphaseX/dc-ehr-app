import { verifyEmailAction } from "@/actions/verify-email/handler";
import { Button } from "@/components/ui/button";
import { getUser } from "@/features/query/get-user";
import { redirect, useRouter } from "next/navigation";

const CompleteAccountPage = async ({
  searchParams: { token, userId },
}: {
  searchParams: { token: string; userId: string };
}) => {
  if (!(token && userId)) {
    return redirect("/");
  }

  let user = await getUser();

  if (user && user.isVerified) {
    return redirect("/");
  }

  const { data, error } = await verifyEmailAction({ userId, token });

  if (!data) {
    return redirect(`/sign-in?error=${error}`);
  }

  user = user || data;

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
          <Button
            type="button"
            className="w-full h-fit p-4 text-base text-white font-semibold
        rounded-[56px] bg-primary-500 !mt-10"
          >
            Go to dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompleteAccountPage;
