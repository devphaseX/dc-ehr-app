"use client";

import { changePasswordSchema } from "@/app/(pages)/(auth)/(recover-password)/reset-password/schema";
import {
  UpdateProfileForm,
  updateProfileSchema,
} from "@/app/(pages)/(auth)/sign-up/schema";
import { FormPasswordInput } from "@/components/form/form-password-input";
import { FormInput } from "@/components/form/input";
import { FormLabel } from "@/components/form/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useDeleteUser } from "@/features/api/mutation/use-delete-user";
import { useDeactivatUser } from "@/features/api/mutation/use-disactivate-user";
import { useConfirm } from "@/hooks/use-confirm";
import { useAuth } from "@/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {};

export const DeleteUserAccount = (props: Props) => {
  const [ConfirmDeleteDialog, confirmDelete] = useConfirm({
    title: "Delete Your Account",
    message:
      "Lorem ipsum dolor sit amet consectetur. Pretium amet tellus sed feugiat pharetra. Habitant ornare a tempor dolor in enimut  pharetra ipsum dolor sit a",
    cancelText: "No, cancel",
    confirmText: "Yes, delete account",
  });

  const { user } = useAuth();

  const [ConfirmDeactivateDialog, confirmDeactivate] = useConfirm({
    title: "Deactivate Your Account",
    message:
      "Lorem ipsum dolor sit amet consectetur. Pretium amet tellus sed feugiat pharetra. Habitant ornare a tempor dolor in enimut  pharetra ipsum dolor sit a",
    cancelText: "No, cancel",
    confirmText: "Yes, deactivate account",
  });

  const { mutate: deactivateUser, isPending: isDeactivating } =
    useDeactivatUser();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user]);

  const disabledAction = isDeactivating || isDeleting;

  return (
    <div className="space-y-8">
      <ConfirmDeleteDialog />
      <ConfirmDeactivateDialog />
      <div className="space-y-6">
        <h4 className="font-semibold text-xl">Delete Your Account</h4>
        <Separator className="bg-neutral-100" />
      </div>

      <div className="space-y-6">
        <p className="text-base text-neutral-500">
          Lorem ipsum dolor sit amet consectetur. Pretium amet tellus sed
          feugiat pharetra. Habitant ornare a tempor dolor in enimut pharetra
          ipsum dolor sit a
        </p>
        <div className="flex items-center gap-x-6">
          <Button
            className="rounded-[48px] px-6 py-3 w-fit h-fit
            text-[#FA5A5A] bg-[#FA5A5A]/5 font-semibold text-sm"
            onClick={async () => {
              const shouldDeactivate = await confirmDeactivate();
              if (shouldDeactivate && user) {
                deactivateUser(user.id);
              }
            }}
            disabled={disabledAction}
          >
            Deactivate account
          </Button>
          <Button
            onClick={async () => {
              const shouldDelete = await confirmDelete();

              if (shouldDelete && user) {
                deleteUser(user.id);
              }
            }}
            disabled={disabledAction}
            className="rounded-[48px] px-6 py-3 w-fit h-fit bg-[#FA5A5A] text-white font-semibold text-sm"
          >
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
};
