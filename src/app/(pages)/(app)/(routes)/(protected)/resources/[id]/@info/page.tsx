import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { addBase64Prefix } from "@/lib/utils";
import { useAuth } from "@/providers/auth";
import Image from "next/image";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { getServerResource } from "@/features/query/get-resource";
import { getAuthorProfile } from "@/features/query/get-author-profile";
import Link from "next/link";
import { AuthorProfile } from "./profile";
import tryit from "@/lib/tryit";

const Info = async ({ params }: { params: { id: string } }) => {
  const [resource, err] = await tryit(getServerResource(params.id));

  if (!(resource || err)) {
    return redirect("/");
  }

  const user = await getAuthorProfile(resource.username);

  if (!user) {
    return redirect("/");
  }

  return <AuthorProfile user={user} />;
};

export default Info;
