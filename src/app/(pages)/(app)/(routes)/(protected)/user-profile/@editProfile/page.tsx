import Link from "next/link";
import { ProfileForm } from "../profile-form";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/providers/auth";

export default function EditProfile() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="max-w-[855px] w-full bg-white rounded-[24px]">
      <div className="p-8 pb-[108px] space-y-16">
        <div className="flex justify-between items-center">
          <Link
            href="/user-profile?tab=settings"
            className="text-primary-500 text-sm flex items-center font-medium gap-x-2"
          >
            <ChevronLeft className="size-5" />
            Setting
          </Link>

          <p className="text-lg text-neutral-800 font-semibold">Edit Profile</p>
        </div>
        <ProfileForm withExtra user={user} />
      </div>
    </div>
  );
}
