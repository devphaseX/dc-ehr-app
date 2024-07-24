import { getUser } from "@/features/query/get-user";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <>{children}</>;
}
