import { getUser } from "@/features/query/get-user";
import { serverApi } from "@/features/server-api";
import { protectedAction } from "@/lib/action";
import { cookies } from "next/headers";

export const deleteUserAction = async () => {
  try {
    const user = await getUser();

    if (!user) {
      return {
        error: "user not authenicated",
        state: {
          authenicated: false,
        },
      };
    }
    const resp = serverApi.put("/User/DeleteUser", { userId: user.id });

    cookies().set("jwt", "", { maxAge: 0 });

    return {
      message: "Your account is now deleted",
    };
  } catch (e) {
    console.log("[DEACTIVATE USER]", e);
    return {
      error: "failed to deleted user account",
    };
  }
};
