"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Lock, User, AlertTriangle } from "lucide-react";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import { useProfile } from "@/store/profile";

export default function ProfilePage() {
  const { status, data } = useSession();
  // @ts-ignore
  const { userdetails, getuserdetails } = useProfile();
  console.log(userdetails, "profile");

  useEffect(() => {
    async function getprofile() {
      await getuserdetails();
    }
    getprofile();
  }, []);
  const [open, setOpen] = useState({
    changePassword: false,
    changeUsername: false,
    deleteAccount: false,
    forgotPassword: false,
  });
  const EditUsernameDilaog = dynamic(
    () => import("@/components/changeUdsername"),
    {
      ssr: false,
    }
  );

  const DeleteAccountDialog = dynamic(
    () => import("@/components/deleteprofile"),
    {
      ssr: false,
    }
  );

  const ForgotPasswordDialog = dynamic(
    () => import("@/components//forgotPassword"),
    {
      ssr: false,
    }
  );

  const ChangePasswordDialog = dynamic(
    () => import("@/components/changepassword"),
    {
      ssr: false,
    }
  );
  if (status === "loading") return <Loading />;
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <div className="absolute bg-zinc-900/10 inset-0 -z-10  bg-[size:4rem_4rem] bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]"></div>
      <div className="container   py-8 px-4  max-w-[1040px]">
        <h1 className="text-3xl font-bold mb-8 text-white">Your Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <Card className="md:col-span-1 bg-neutral-950 border-neutral-800 text-neutral-50">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                {/* <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.username} /> */}
                {/* @ts-ignore */}
                <AvatarFallback className="bg-neutral-800">
                  {userdetails?.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{userdetails.username}</CardTitle>
              <div className="flex items-center mt-1">
                <span
                  className="text-sm text-muted-foreground"
                  style={{ color: "#a0a0a0" }}
                >
                  {userdetails.email}
                </span>
                {userdetails.isVerified && (
                  <Badge
                    variant="outline"
                    className="ml-2 bg-green-50 text-green-700 border-green-200 flex items-center"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                variant="outline"
                className="w-full mb-2"
                onClick={() => setOpen((prev)=>({
                  ...prev,
                  changeUsername:true
                }))}
              >
                <User className="h-4 w-4 mr-2" />
                Change Username
              </Button>
              {/* <Button
                variant="outline"
                className="w-full"
                onClick={() => setOpen((prev)=>({
                  ...prev,
                  changePassword:true
                }))}
              >
                <Lock className="h-4 w-4 mr-2" />
                Change Password
              </Button> */}
            </CardContent>
          </Card>

          {/* Account Settings Card */}
          <Card className="md:col-span-2  bg-neutral-950 border-neutral-800 text-neutral-50">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription style={{ color: "#a0a0a0" }}>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p
                      className="text-sm text-muted-foreground"
                      style={{ color: "#a0a0a0" }}
                    >
                      Username
                    </p>
                    <p className="font-medium">{userdetails.username}</p>
                  </div>
                  <div className="space-y-1">
                    <p
                      className="text-sm text-muted-foreground"
                      style={{ color: "#a0a0a0" }}
                    >
                      Email
                    </p>
                    <p className="font-medium">{userdetails.email}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Security</h3>
                <p
                  className="text-sm text-muted-foreground mb-4"
                  style={{ color: "#a0a0a0" }}
                >
                  Manage your password and account security settings
                </p>
                <Button
                  variant="outline"
                  className="mr-2 mb-2"
                  onClick={() => setOpen((prev)=>({
                    ...prev,
                    changePassword:true
                  }))}
                >
                  Change Password
                </Button>
                <Button
                  variant="outline"
                  className="mb-2"
                  onClick={() => setOpen((prev)=>({
                    ...prev,
                    forgotPassword:true
                  }))}
                >
                  Forgot Password
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <h3 className="text-lg font-medium mb-2 text-red-600">
                Danger Zone
              </h3>
              <p
                className="text-sm text-muted-foreground mb-4"
                style={{ color: "#a0a0a0" }}
              >
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <Button
                variant="destructive"
                className=" focus-visible:ring-destructive/40 bg-red-500 hover:bg-red-600  aria-invalid:ring-destructive/40"
                onClick={() => setOpen((prev)=>({
                  ...prev,
                  deleteAccount:true
                }))}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </CardFooter>
          </Card>
        </div>

        <ChangePasswordDialog
          open={open.changePassword}
          onOpenChange={(val)=>setOpen((prev)=>({
            ...prev, 
            changePassword: val
          }))}
        />

        <EditUsernameDilaog
          open={open.changeUsername}
          onOpenChange={(val)=>setOpen((prev)=>({
            ...prev, 
            changeUsername: val
          }))}
          currentUsername={userdetails.username as string}
        />

        <DeleteAccountDialog
          open={open.deleteAccount}
          onOpenChange={(val)=>setOpen((prev)=>({
            ...prev, 
            deleteAccount: val
          }))}
        />

        <ForgotPasswordDialog
          open={open.forgotPassword}
          onOpenChange={(val)=>setOpen((prev)=>({
            ...prev, 
            forgotPassword: val
          }))}
          email={userdetails.email as string}
        />
      </div>
    </div>
  );
}
