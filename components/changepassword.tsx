"use client";

import type React from "react";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExtendedPasswordSchema } from "@/app/types/schema";
import { useProfile } from "@/store/profile";
import { toast } from "sonner";

type ChangePasswordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type formSchmea = z.infer<typeof ExtendedPasswordSchema>;
const ChangePasswordDialog = ({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  //  @ts-ignore
  const { changePassword } = useProfile();

  const form = useForm<formSchmea>({
    resolver: zodResolver(ExtendedPasswordSchema),
    defaultValues: {
      currentpass: "",
      newPass: "",
      confirmPass: "",
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const onsubmit = async (data: formSchmea) => {
    const { currentpass, newPass } = data;
    setIsLoading(true);
    try {
      const res = await changePassword(currentpass, newPass);
      if (res?.status === 401) {
        setError("currentpass", {
          type: "server",
          message: res.error || "Current password is incorrect",
        });
        return;
      }
      if (res.success) {
        toast.success("Password Changed Successfully", { duration: 3000 });
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Something Went Wrong", { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]  bg-neutral-950 border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-white">Change Password</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Enter your current password and a new password to update your
            credentials.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4 py-4" onSubmit={handleSubmit(onsubmit)}>
            <div className="space-y-2">
              <FormField
                control={control}
                name="currentpass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="currentpass"
                        placeholder="John Doe"
                        className="text-white"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-neutral-400">
                      {errors.currentpass?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={control}
                name="newPass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="newPass"
                        placeholder="New Pass"
                        type="password"
                        className="text-white"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-neutral-400">
                      {errors.newPass?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={control}
                name="confirmPass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      {" "}
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="confirmPass"
                        placeholder="New Pass"
                        type="password"
                        className="text-white"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-neutral-400">
                      {errors.confirmPass?.message}
                    </FormMessage>
                  </FormItem>
                )}
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
                disabled={isLoading}
                className="bg-white text-shadow-black"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
