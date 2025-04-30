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
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSession } from "next-auth/react";
import { useProfile } from "@/store/editprofile";
import { usernameSchema } from "@/app/types/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "./ui/form";
import { toast } from "sonner";

interface ChangeUsernameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUsername: string;
}

type formType = z.infer<typeof usernameSchema>; 

const  ChangeUsernameDialog=({
  open,
  onOpenChange,
  currentUsername,
}: ChangeUsernameDialogProps) =>{
  const [success, setSuccess] = useState({
    loading: false,
    value: false,
  });
  const { data } = useSession();
  // @ts-ignore
  const { editusername,getuserdetails } = useProfile();

  const form = useForm<formType>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onsubmit = async (value: formType) => {
    setSuccess({
      loading: true,
      value:true
    });
    try {
      // @ts-ignore
      const res = await editusername(data?.user?.userId, value.username);
      if (res.success) {
        toast.success("username changed");
        onOpenChange(false);
        await getuserdetails()
      } else {
        toast.error("Something went wrong ");
      }
    } catch (error) {
    } finally {
      setSuccess({
        loading: false,
        value: false,
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-neutral-950 border-neutral-800 ">
        <DialogHeader>
          <DialogTitle className="text-white">Change Username</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Enter a new username for your account.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-username" className="text-white">Current Username</Label>
              <Input id="current-username"  className="focus-visible:border-blue-600 aria-invalid:border-red-900 focus-visible:ring-blue-300/50   selection:bg-neutral-50 selection:text-neutral-900 border-neutral-800 placeholder:text-neutral-400v text-white "  value={currentUsername} disabled />
            </div>
 
            <div className="space-y-2">
              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Your Name</FormLabel>
                    <FormControl>
                      <Input {...field} id="username" placeholder="John Doe" disabled={success.loading}  className="focus-visible:border-blue-600 aria-invalid:border-red-900 focus-visible:ring-blue-300/50  text-white selection:bg-neutral-50 selection:text-neutral-900 border-neutral-800 placeholder:text-neutral-400 "/>
                    </FormControl>
                    <FormMessage className="text-neutral-400">{errors.username?.message}</FormMessage>
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
              <Button type="submit" className="bg-white text-shadow-black" disabled={success.loading}>
                {success.loading ? "Updating..." : "Update Username"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


export  default ChangeUsernameDialog;