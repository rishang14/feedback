"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback,  } from "@radix-ui/react-avatar";
import { 
  LogOutIcon,
  UserCircleIcon,
  Pencil,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";

const Nav = () => {
  const session = useSession();

  
  return (
    <header className=" bg-black/30  backdrop-blur-2xl w-full  shadow-lg border-b border-b-slate-800 z-[200]">
      <nav className="flex justify-between items-center w-full mt-5 md:px-12 pb-3 px-4 ">
        <Link href="/" className="md:text-2xl text-lg text-white font-bold  ">
          ReviewVault
        </Link>
        <div className="flex  items-center md:space-x-6 space-x-2">
          {session.status === "authenticated" ? (
            <div className="">
              <AvatarWithMenu />
            </div>
          ) : (
            <>
              <Link
                href="/"
                className="font-medium hover:text-blue-300 text-white text-md"
              >
                Features
              </Link>
              <Link
                href="/auth/signup"
                className="font-medium hover:text-blue-300 text-white text-md"
              >
                Sign-up
              </Link>
              <Button
                className="font-medium text-md  bg-blue-500"
                asChild={true}
                variant={"default"}
              >
                <Link href="/auth/signin" className=" text-white">
                  Sign-in
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;

const AvatarWithMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Avatar className="h-12 w-12   rounded-full cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all">
          <AvatarFallback
            className="flex bg-white rounded-full items-center "
            color="white"
          >
            <UserCircleIcon />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex flex-col p-4 border-1 rounded-sm border-slate-600 bg-white"
        align="end"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-black">
              John Doe
            </p>
            <p className="text-xs leading-none   text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer mt-2 mb-2">
          <div className="flex gap-1  items-center ">
            <Pencil className="mr-2  w-4 group-hover:text-blue-500" />
            Edit profile
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer    text-red-600 hover:border-none">
          <div className="flex gap-1  items-center " onClick={() => signOut()}>
            <LogOutIcon className="mr-2  w-4 group-hover:text-red-700" />
            Sign out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
