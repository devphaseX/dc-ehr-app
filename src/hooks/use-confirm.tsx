import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type UseConfirmProps = {
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
};
export const useConfirm = ({
  title,
  message,
  cancelText,
  confirmText,
}: UseConfirmProps): [() => JSX.Element, () => Promise<boolean>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise<boolean>((resolve) =>
      setPromise({
        resolve,
      }),
    );

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmDialog = () => {
    return (
      <Dialog
        open={promise !== null}
        onOpenChange={(open) => {
          if (!open && promise) {
            handleCancel();
          }
        }}
      >
        <DialogContent className="space-y-8">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-[28px] font-semibold leading-[37px] text-center">
              {title}
            </DialogTitle>
            <DialogDescription className="text-base text-neutral-500 text-center">
              {message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex [&>*]:flex-1 gap-x-6">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="rounded-[48px] px-6 py-3 w-fit h-fit
            text-[#FA5A5A] bg-[#FA5A5A]/5 font-semibold text-sm border-none"
            >
              {cancelText || "Cancel"}
            </Button>
            <Button
              onClick={handleConfirm}
              className="rounded-[48px] px-6 py-3 w-fit h-fit bg-[#FA5A5A] text-white font-semibold text-sm"
            >
              {confirmText || "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return [ConfirmDialog, confirm];
};
