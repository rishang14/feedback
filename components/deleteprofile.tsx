"use client";

import type React from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProfile } from "@/store/profile";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteAccountDialog = ({
  open,
  onOpenChange,
}: DeleteAccountDialogProps) => {
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // @ts-ignore
  const { deleteUser } = useProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (confirmation !== "DELETE") {
      setError('Please type "DELETE" to confirm');
      return;
    }
    setIsLoading(true);

    try {
      const res = await deleteUser();
      if (res.success) {
        await signOut({ callbackUrl: "/" });
        router.push("/");
      }
    } catch (err) {
      setError("Failed to delete account. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]  bg-neutral-950 border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Delete Account
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Alert variant="destructive" className="border-red-300">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              All of your data will be permanently removed. This action cannot
              be undone.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="delete-confirmation" className="text-neutral-400">
              Type <span className="font-bold text-red-500">DELETE</span> to
              confirm
            </Label>
            <Input
              id="delete-confirmation"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder="DELETE"
              className="focus-visible:border-blue-600 aria-invalid:border-red-900 focus-visible:ring-blue-300/50   selection:bg-neutral-50 selection:text-neutral-900 border-neutral-800 placeholder:text-neutral-400v text-white"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              className="bg-blue-500 text-white "
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              className="bg-red-500 text-white "
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
