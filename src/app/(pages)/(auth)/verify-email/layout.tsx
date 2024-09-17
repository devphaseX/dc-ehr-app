import { getUser } from "@/features/query/get-user";
import { redirect } from "next/navigation";

export default async function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (user?.isVerified) {
    return redirect("/");
  }

  return children;
}
