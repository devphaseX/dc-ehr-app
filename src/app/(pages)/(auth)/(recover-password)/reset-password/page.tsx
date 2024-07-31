import { clearRecoveryJwt, getRecoveryJwt, setJwt } from "@/auth";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "./_page";
import { serverApi } from "@/features/server-api";
import { resetPasswordResSchema } from "@/lib/response";
import { getUser } from "@/features/query/get-user";
import { cookies } from "next/headers";
import { NonCompliantResponseError } from "@/lib/error";

export default async function ResetPassword() {
  const jwt = getRecoveryJwt();

  if (!jwt) {
    return redirect("/forget-password");
  }

  const getJwt = async () => {
    "use server";
    return jwt;
  };

  return (
    <ResetPasswordForm
      changePassword={async ({ password }) => {
        "use server";

        const jwt = await getJwt();

        const user = await getUser(jwt ?? undefined);

        if (!user) {
          return { error: "not a valid user" };
        }

        const { data } = await serverApi.put(
          `/Auth/UpdatePassword/${user.email}?newPassword=${password}`,
          undefined,
          {
            headers: { Authorization: `bearer ${jwt}` },
            validateResponse: (data) => resetPasswordResSchema.parse(data),
          },
        );

        if (!data) {
          throw new NonCompliantResponseError();
        }

        if (data.responseCode !== 200) {
          return { error: data.responseMessage };
        }

        await clearRecoveryJwt();

        setJwt(data.responseData!.token);

        return { message: "Password reset sucessfully" };
      }}
    />
  );
}
