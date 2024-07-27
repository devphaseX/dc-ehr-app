import { verifyEmailAction } from "@/actions/verify-email/handler";
import { Button } from "@/components/ui/button";
import { serverApi } from "@/features/server-api";
import { redirect } from "next/navigation";
import { SetAuthToken } from "./set-auth-token";
import { cookies } from "next/headers";
import { TimeSpan } from "oslo";
import { getUser } from "@/features/query/get-user";
import Link from "next/link";
import { Footer } from "../../(app)/(home)/__components/footer";
import { setJwt } from "@/auth";

const ConfirmEmailVerify = async ({
  searchParams: { token, userId },
}: {
  searchParams: { token: string; userId: string };
}) => {
  if (!(token && userId)) {
    return redirect("/");
  }

  const user = await getUser();

  if (user && user.isVerified) {
    return redirect("/");
  }

  const { data, error } = await verifyEmailAction({ userId, token });

  if (!data) {
    return redirect(`/sign-in?error=${error}`);
  }

  return (
    <div className="absolute inset-0">
      <div className="flex flex-col justify-between h-full">
        <div className="w-full flex justify-center pt-24">
          <div className="space-y-8">
            <div className="space-y-3 text-center">
              <h3 className="font-bold text-[28px] leading-[37px] text-neutral-800">
                Email verification
              </h3>
              <p className="text-lg text-neutral-500">
                Your email{" "}
                <span className="font-semibold text-neutral-700 underline">
                  {data.email}
                </span>{" "}
                is verified
              </p>
            </div>
            <div className="space-y-4 flex justify-center">
              <Link
                className="w-full h-fit p-4 text-base text-white font-semibold
        rounded-[56px] bg-primary-500 text-center"
                href="/"
              >
                Go to dashboard
              </Link>
              {data && (
                <SetAuthToken
                  setToken={async () => {
                    "use server";
                    setJwt(token);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <Footer copyRightYear={new Date().getFullYear()} />
      </div>
    </div>
  );
};

export default ConfirmEmailVerify;
