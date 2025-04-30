"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import AvatarWithMenu from "../Avatarwithmenu";
import { useProfile } from "@/store/editprofile";

const Nav = () => {
  const { status, data } = useSession();
  // @ts-ignore
  const { userdetails, getuserdetails } = useProfile();

  useEffect(() => {
    async function getvalues() {
      await getuserdetails();
    }
    getvalues();
  }, []);
  return (
    <header className=" bg-black/30  backdrop-blur-2xl w-full relative shadow-lg border-b border-b-slate-800 z-[200]">
      <nav className="flex justify-between items-center w-full mt-5 md:px-12 pb-3 px-4 ">
        <Link href="/" className="md:text-2xl text-lg text-white font-bold  ">
          ReviewVault
        </Link>
        {status !== "loading" ? (
          <div className="flex  items-center md:space-x-6 space-x-2">
            {status === "authenticated" ? (
              <div className="">
                <AvatarWithMenu data={userdetails} />
              </div>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="font-medium hover:text-blue-300 text-white text-md"
                >
                  Sign-up
                </Link>
                <Button
                  className="font-medium text-md  bg-blue-500"
                  asChild={true}
                  variant={"default"}
                >
                  <Link href="/signin" className=" text-white">
                    Sign-in
                  </Link>
                </Button>
              </>
            )}
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Nav;
